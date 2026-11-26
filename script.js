// Data Produk Alat Tulis
const products = [
    { id: 1, name: "Pulpen Gel Hitam 0.5mm", price: 4500, icon: "🖊️", desc: "Tinta lancar, cepat kering, nyaman digenggam." },
    { id: 2, name: "Buku Tulis Campus 58 Lembar", price: 6000, icon: "📓", desc: "Kertas tebal tidak tembus tinta, sampul menarik." },
    { id: 3, name: "Pensil Kayu 2B (Isi 12)", price: 18000, icon: "✏️", desc: "Cocok untuk ujian komputer dan sketsa." },
    { id: 4, name: "Penghapus Karet Putih", price: 3000, icon: "🧼", desc: "Menghapus bersih tanpa merusak permukaan kertas." },
    { id: 5, name: "Penggaris Plastik 30 cm", price: 3500, icon: "📏", desc: "Transparan, lentur, dan angka tidak mudah pudar." },
    { id: 6, name: "Stabilo Highlighter Pastel", price: 8500, icon: "🖍️", desc: "Warna lembut di mata untuk menandai catatan penting." },
    { id: 7, name: "Spidol Whiteboard Hitam", price: 9000, icon: "🖌️", desc: "Mudah dihapus dan tinta pekat." },
    { id: 8, name: "Sticky Notes Warna-Warni", price: 7500, icon: "🗒️", desc: "Isi 100 lembar dengan daya rekat kuat." }
];

// State Aplikasi (Ambil dari localStorage jika ada)
let currentUser = localStorage.getItem("penakita_user") || null;
let cart = JSON.parse(localStorage.getItem("penakita_cart")) || [];

// Format Angka ke Rupiah
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// Render Katalog Produk
function renderProducts(filterText = "") {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
        productList.innerHTML = "<p>Produk tidak ditemukan.</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div>
                <div class="product-icon">${product.icon}</div>
                <div class="product-title">${product.name}</div>
                <div class="product-desc">${product.desc}</div>
            </div>
            <div>
                <div class="product-price">${formatRupiah(product.price)}</div>
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id})">
                    + Tambah ke Keranjang
                </button>
            </div>
        `;
        productList.appendChild(card);
    });
}

// Fitur Pencarian
document.getElementById("searchInput").addEventListener("input", (e) => {
    renderProducts(e.target.value);
});

// Update Tampilan Login/Logout
function updateAuthUI() {
    const authBtn = document.getElementById("authBtn");
    const userGreeting = document.getElementById("userGreeting");

    if (currentUser) {
        userGreeting.textContent = `Halo, ${currentUser}`;
        authBtn.textContent = "Logout";
        authBtn.onclick = logout;
    } else {
        userGreeting.textContent = "";
        authBtn.textContent = "Login";
        authBtn.onclick = () => openModal("loginModal");
    }
}

// Proses Login
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    if (username) {
        currentUser = username;
        localStorage.setItem("penakita_user", currentUser);
        updateAuthUI();
        closeModal("loginModal");
        document.getElementById("loginForm").reset();
        alert(`Selamat datang, ${currentUser}!`);
    }
});

// Proses Logout
function logout() {
    if (confirm("Yakin ingin keluar dari akun?")) {
        currentUser = null;
        localStorage.removeItem("penakita_user");
        updateAuthUI();
    }
}

// Tambah ke Keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveAndRenderCart();
}

// Ubah Jumlah Item di Keranjang
function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    saveAndRenderCart();
}

// Hapus Item dari Keranjang
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveAndRenderCart();
}

// Simpan & Render Keranjang
function saveAndRenderCart() {
    localStorage.setItem("penakita_cart", JSON.stringify(cart));
    
    const cartCount = document.getElementById("cartCount");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalQty;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='padding: 20px 0; text-align: center; color: #64748b;'>Keranjang masih kosong.</p>";
        cartTotal.textContent = "Rp 0";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        totalPrice += subtotal;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.icon} ${item.name}</h4>
                <p>${formatRupiah(item.price)} x ${item.qty} = <strong>${formatRupiah(subtotal)}</strong></p>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Hapus</button>
            </div>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = formatRupiah(totalPrice);
}

// Tombol Buka Keranjang
document.getElementById("cartBtn").addEventListener("click", () => {
    saveAndRenderCart();
    openModal("cartModal");
});

// Proses Beli / Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    // Wajib login sebelum membeli
    if (!currentUser) {
        closeModal("cartModal");
        alert("Silakan login terlebih dahulu untuk menyelesaikan pembelian.");
        openModal("loginModal");
        return;
    }

    // Buat Struk Pembelian
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemsListHTML = cart.map(i => `• ${i.name} (${i.qty}x) - ${formatRupiah(i.price * i.qty)}`).join("<br>");

    document.getElementById("receiptDetails").innerHTML = `
        <strong>Pembeli:</strong> ${currentUser}<br>
        <strong>Tanggal:</strong> ${new Date().toLocaleDateString("id-ID")}<br>
        <hr style="margin: 8px 0; border: 0; border-top: 1px dashed #cbd5e1;">
        ${itemsListHTML}
        <hr style="margin: 8px 0; border: 0; border-top: 1px dashed #cbd5e1;">
        <strong>Total Dibayar: ${formatRupiah(totalPrice)}</strong>
    `;

    // Kosongkan keranjang setelah beli
    cart = [];
    saveAndRenderCart();
    closeModal("cartModal");
    openModal("receiptModal");
});

// Fungsi Helper Modal
function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// Tutup modal jika klik di luar kotak
window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
};

// Inisialisasi awal
updateAuthUI();
renderProducts();
saveAndRenderCart();

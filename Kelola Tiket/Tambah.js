// Update total harga saat jumlah tiket berubah
function updateTotal() {
    const jumlahTiket = parseInt(document.getElementById('jumlah_tiket').value) || 0;
    const hargaTiket = 2000;
    const totalHarga = jumlahTiket * hargaTiket;
    document.getElementById('total_harga').value = totalHarga;
}

// Fungsi untuk popup tambah data
function closePopup() {
    const popup = document.getElementById('success-popup');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
        window.location.href = 'Kelola_tiket.html';
    }, 300);
}

// Fungsi untuk menampilkan dialog logout
function showLogoutDialog() {
    const dialog = document.getElementById('logoutDialog');
    dialog.style.display = 'flex';
    dialog.style.opacity = '0';
    setTimeout(() => {
        dialog.style.opacity = '1';
    }, 10);
}

// Fungsi untuk menutup dialog logout
function closeLogoutDialog() {
    const dialog = document.getElementById('logoutDialog');
    dialog.style.opacity = '0';
    setTimeout(() => {
        dialog.style.display = 'none';
    }, 300);
}

// Fungsi untuk konfirmasi logout
function confirmLogout() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = '/Code Maskuy/Beranda/Beranda.html';
    }, 300);
}

function loadAdminData() {
    fetch('Profil.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const adminUsernameElement = document.getElementById('adminUsername');
            if (!adminUsernameElement) {
                throw new Error('Admin username element not found');
            }

            if (data.success && data.data && data.data.username) {
                adminUsernameElement.textContent = data.data.username;
            } else {
                throw new Error(data.message || 'Failed to load admin data');
            }
        })
        .catch(error => {
            console.error('Error loading admin data:', error);
            const adminUsernameElement = document.getElementById('adminUsername');
            if (adminUsernameElement) {
                adminUsernameElement.textContent = 'Error loading data';
            }
        });
}

// Load data admin
loadAdminData();

// Event listener saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Hitung total awal
    updateTotal();

    // Setup form submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            try {
                const formData = new FormData(this);
                const response = await fetch('Tambah.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    const popup = document.getElementById('success-popup');
                    popup.style.display = 'flex';
                    popup.style.opacity = '0';
                    setTimeout(() => {
                        popup.style.opacity = '1';
                    }, 10);
                } else {
                    alert(result.message || 'Gagal menambahkan data');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan sistem');
            }
        });
    }

    // Setup keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLogoutDialog();
            const successPopup = document.getElementById('success-popup');
            if (successPopup && successPopup.style.display === 'flex') {
                closePopup();
            }
        }
    });

    // Setup logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLogoutDialog();
        });
    }
});

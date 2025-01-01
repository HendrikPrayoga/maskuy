// Fungsi untuk mengambil data pelanggan
function fetchData(query = '') {
    const url = query ? `cari_pelanggan.php?query=${query}` : '../Data Base/Kelola_tkt.php';

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            const tbody = document.getElementById('data-tabel');
            let rows = '';

            if (data && data.length > 0) {
                data.forEach(item => {
                    rows += `<tr>
                        <td>${item.nomor_identitas || ''}</td>
                        <td>${item.nama_lengkap || ''}</td>
                        <td>${item.nomor_telepon || ''}</td>
                        <td>${item.email || ''}</td>
                        <td>
                            <button class="edit-btn" onclick="editData(${item.id})">Edit</button>
                            <button class="delete-btn" onclick="hapusData(${item.id}, '${item.nomor_identitas}')">Hapus</button>
                        </td>
                    </tr>`;
                });
            } else {
                rows = '<tr><td colspan="5">Tidak ada data yang ditemukan</td></tr>';
            }

            tbody.innerHTML = rows;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('data-tabel').innerHTML =
                '<tr><td colspan="5">Gagal memuat data</td></tr>';
        });
}

// Fungsi untuk mengambil total pelanggan dan penghasilan
function fetchStats() {
    fetch('penghasilan&pelanggan.php')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const totalPelanggan = document.getElementById('total-pelanggan');
            const totalPenghasilan = document.getElementById('total-penghasilan');

            if (totalPelanggan) {
                totalPelanggan.textContent = data.total_pelanggan || '0';
            }

            if (totalPenghasilan) {
                const amount = parseFloat(data.total_penghasilan || 0);
                totalPenghasilan.textContent = `Rp. ${amount.toLocaleString('id-ID')}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const totalPelanggan = document.getElementById('total-pelanggan');
            const totalPenghasilan = document.getElementById('total-penghasilan');

            if (totalPelanggan) totalPelanggan.textContent = '0';
            if (totalPenghasilan) totalPenghasilan.textContent = 'Rp. 0';
        });
}

// Fungsi untuk mendapatkan parameter dari URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fungsi untuk memuat data pelanggan untuk edit
function loadEditData(id) {
    console.log('Fetching data for ID:', id);

    fetch(`edit_pelanggan.php?id=${id}`)
        .then(response => response.json())
        .then(result => {
            console.log('Data received:', result);

            if(result.status === 'success' && result.data) {
                const data = result.data;
                document.getElementById('id').value = data.id || '';
                document.getElementById('nomor_identitas').value = data.nomor_identitas || '';
                document.getElementById('nama_lengkap').value = data.nama_lengkap || '';
                document.getElementById('nomor_telepon').value = data.nomor_telepon || '';
                document.getElementById('email_pelanggan').value = data.email || '';
            } else {
                throw new Error(result.message || 'Data tidak ditemukan');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal memuat data pelanggan: ' + error.message);
        });
}

// Fungsi untuk menampilkan notifikasi sukses pada edit
function showSuccessNotification() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('successNotification').style.display = 'block';
}

// Fungsi untuk menangani tombol kembali pada notifikasi
function handleKembali() {
    window.location.href = 'kelola_pelanggan.html';
}

// Fungsi untuk menampilkan form tambah
function tampilkanForm() {
    document.querySelector('table').style.display = 'none';
    document.querySelector('.add-btn').style.display = 'none';
    document.getElementById('formTambah').style.display = 'block';
}

// Fungsi untuk memvalidasi input
function validateForm(formData) {
    const nomor_identitas = formData.get('nomor_identitas');
    const nama_lengkap = formData.get('nama_lengkap');
    const nomor_telepon = formData.get('nomor_telepon');
    const email = formData.get('email');

    if (!nomor_identitas || !nama_lengkap || !nomor_telepon || !email) {
        throw new Error('Semua field harus diisi');
    }

    // Validasi format nomor telepon (minimal 10 digit, maksimal 13 digit)
    if (!/^\d{10,13}$/.test(nomor_telepon)) {
        throw new Error('Nomor telepon harus berisi 10-13 digit angka');
    }

    // Validasi format email sederhana
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Format email tidak valid');
    }
}

// Fungsi untuk menangani submit form tambah
function handleTambahSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        // Validasi form sebelum submit
        validateForm(formData);

        fetch('Tambah_pelanggan.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Terjadi kesalahan pada server');
            }
            return response.json();
        })
        .then(result => {
            if (result.status === 'success') {
                document.getElementById('success-popup').style.display = 'flex';
            } else {
                throw new Error(result.message || 'Terjadi kesalahan saat menambah data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal menambah data: ' + error.message);
        });
    } catch (error) {
        alert(error.message);
    }
}

// Fungsi untuk load data admin
function loadAdminData() {
    fetch('Profil.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data && data.data.username) {
                document.getElementById('adminUsername').textContent = data.data.username;
            } else {
                console.error('Error:', data.message);
                document.getElementById('adminUsername').textContent = data.message || 'Error loading data';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('adminUsername').textContent = 'Error loading data';
        });
}

// Fungsi untuk popup tambah data
function closePopup() {
    document.getElementById('success-popup').style.display = 'none';
    window.location.href = 'kelola_pelanggan.html';
}

// Fungsi untuk pencarian
function cariData() {
    const query = document.getElementById('search').value.trim();
    fetchData(query);
}

// Fungsi untuk mengedit data
function editData(id) {
    console.log('Editing ID:', id);
    window.location.href = `edit_pelanggan.html?id=${id}`;
}

// Fungsi untuk menampilkan dialog konfirmasi hapus
function showDeleteConfirmation(id, nomorIdentitas) {
    const dialogHTML = `
        <div class="dialog-overlay" id="deleteDialog" style="display: flex;">
            <div class="dialog-content">
                <div class="dialog-icon">
                    <div class="red-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="dialog-text">
                    Anda yakin ingin menghapus data pelanggan dengan
                    <br>
                    No Identitas ${nomorIdentitas}?
                </div>
                <div class="dialog-buttons">
                    <button onclick="confirmDelete(${id})" class="btn-ya">Ya</button>
                    <button onclick="closeDeleteDialog()" class="btn-tidak">Tidak</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', dialogHTML);
}

// Fungsi untuk menutup dialog konfirmasi hapus
function closeDeleteDialog() {
    const deleteDialog = document.getElementById('deleteDialog');
    if (deleteDialog) {
        deleteDialog.remove();
    }
}

// Fungsi untuk menampilkan notifikasi sukses delete
function showSuccessDelete() {
    const successHTML = `
        <div class="dialog-overlay" id="successDialog" style="display: flex;">
            <div class="dialog-content">
                <div class="success-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <div class="dialog-text">
                    Data berhasil dihapus
                </div>
                <div class="dialog-buttons">
                    <button onclick="closeSuccessDialog()" class="btn-oke">Oke</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', successHTML);
}

// Fungsi untuk menutup notifikasi sukses
function closeSuccessDialog() {
    const successDialog = document.getElementById('successDialog');
    if (successDialog) {
        successDialog.remove();
    }
    fetchData();
    fetchStats();
}

// Fungsi untuk mengkonfirmasi penghapusan
function confirmDelete(id) {
    const buttons = document.querySelectorAll('#deleteDialog button');
    buttons.forEach(button => {
        button.disabled = true;
    });

    const yesButton = document.querySelector('#deleteDialog .btn-ya');
    if (yesButton) {
        yesButton.textContent = 'Menghapus...';
    }

    fetch(`delete_pelanggan.php?id=${id}`, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(result => {
        closeDeleteDialog();
        showSuccessDelete();
    })
    .catch(error => {
        console.error('Error:', error);
        closeDeleteDialog();
        showErrorDialog('Gagal menghapus data. Silakan coba lagi.');
    });
}

// Fungsi untuk menampilkan error dialog
function showErrorDialog(message) {
    const errorHTML = `
        <div class="dialog-overlay" id="errorDialog" style="display: flex;">
            <div class="dialog-content">
                <div class="error-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div class="dialog-text">
                    ${message}
                </div>
                <div class="dialog-buttons">
                    <button onclick="closeErrorDialog()" class="btn-oke">Oke</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', errorHTML);
}

// Fungsi untuk menutup error dialog
function closeErrorDialog() {
    const errorDialog = document.getElementById('errorDialog');
    if (errorDialog) {
        errorDialog.remove();
    }
}

// Modifikasi fungsi hapusData yang ada
function hapusData(id, nomorIdentitas) {
    showDeleteConfirmation(id, nomorIdentitas);
}

// Fungsi untuk menampilkan dialog logout
function showLogoutDialog() {
    document.getElementById('logoutDialog').style.display = 'flex';
}

// Fungsi untuk menutup dialog logout
function closeLogoutDialog() {
    document.getElementById('logoutDialog').style.display = 'none';
}

// Fungsi untuk konfirmasi logout
function confirmLogout() {
    console.log('Melakukan logout...');
    window.location.href = '/Code Maskuy/Beranda/Beranda.html';
}

// Fungsi untuk menangani submit form edit
function handleSubmit(event) {
    event.preventDefault();
    console.log('Form edit submitted');

    const formData = new FormData(event.target);

    fetch('edit_pelanggan.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        console.log('Update result:', result);

        if(result.status === 'success') {
            showSuccessNotification();
        } else {
            throw new Error(result.message || 'Terjadi kesalahan');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Gagal mengupdate data: ' + error.message);
    });
}

// Event listener saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');

    // Load data admin
    loadAdminData();

    // Tambahkan event listener untuk tombol logout
    const logoutBtn = document.querySelector('.logout-btn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutDialog();
        });
    }

    // Cek apakah ini halaman edit
    const id = getUrlParameter('id');
    if (id && document.getElementById('edit-form')) {
        console.log('Loading edit data...');
        loadEditData(id);
    }

    // Cek apakah ini halaman utama
    if (document.getElementById('data-tabel')) {
        console.log('Loading main page data...');
        fetchData();
        fetchStats();
        setInterval(fetchStats, 30000);
    }

    // Event listener untuk form tambah
    const tambahForm = document.getElementById('tambahForm');
    if(tambahForm) {
        tambahForm.addEventListener('submit', handleTambahSubmit);
    }

    // Setup keyboard event untuk dialog dan notifikasi
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLogoutDialog();
            const successNotification = document.getElementById('successNotification');
            if (successNotification && successNotification.style.display === 'block') {
                handleKembali();
            }
            const successPopup = document.getElementById('success-popup');
            if (successPopup && successPopup.style.display === 'flex') {
                closePopup();
            }
        }
    });
});

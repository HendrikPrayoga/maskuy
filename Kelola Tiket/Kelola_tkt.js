// Fungsi untuk mengambil data dari server
function fetchData(query = '') {
    const url = query ? `Cari.php?query=${query}` : '../Data Base/Kelola_tkt.php';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('data-tabel');
            let rows = '';

            if (data.length > 0) {
                data.forEach(item => {
                    rows += `<tr>
                                <td>${item.id}</td>
                                <td>${item.nomor_identitas}</td>
                                <td>${item.nama_lengkap}</td>
                                <td>${item.jumlah}</td>
                                <td>${item.total}</td>
                                <td>
                                    <button class="edit-btn" onclick="editData(${item.id})">Edit</button>
                                    <button class="delete-btn" onclick="hapusData(${item.id})">Hapus</button>
                                </td>
                            </tr>`;
                });
            } else {
                rows = '<tr><td colspan="6">Tidak ada data yang ditemukan</td></tr>';
            }

            tbody.innerHTML = rows;
            fetchStats();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal mengambil data: ' + error.message);
        });
}

// Fungsi untuk mengambil total pelanggan dan penghasilan
function fetchStats() {
    fetch('penghasilan&pelanggan1.php')
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

// Fungsi untuk mengupdate total harga
function updateTotal() {
    const jumlahTiket = parseInt(document.getElementById('jumlah_tiket').value) || 0;
    const hargaTiket = 2000;
    const totalHarga = jumlahTiket * hargaTiket;
    document.getElementById('total_harga').value = totalHarga;
}

// Fungsi untuk memuat data untuk edit
function loadData(id) {
    fetch(`get_tiket.php?id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data yang diterima:', data);
            if (data.error) {
                throw new Error(data.error);
            }

            const elements = {
                'id_tiket': data.id,
                'nomor_identitas': data.nomor_identitas,
                'nama_lengkap': data.nama_lengkap,
                'jumlah_tiket': data.jumlah,
                'total_harga': data.total
            };

            Object.entries(elements).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.value = value;
                    console.log(`Setting ${id} to ${value}`);
                } else {
                    console.error(`Element with id '${id}' not found`);
                }
            });

            updateTotal();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal memuat data: ' + error.message);
        });
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

// Fungsi untuk menampilkan dialog konfirmasi hapus
function showDeleteConfirmation(id) {
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
                    Anda yakin ingin menghapus data tiket dengan
                    <br>
                    Kode Tiket ${id}?
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

// Fungsi untuk menutup dialog konfirmasi
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

    fetch(`delete.php?id=${id}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
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

// Fungsi hapus data
function hapusData(id) {
    if (!id) {
        console.error('ID tidak valid');
        return;
    }
    showDeleteConfirmation(id);
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
    window.location.href = '/Code Maskuy/Beranda/Beranda.html';
}

// Fungsi untuk pencarian data
function cariData() {
    const query = document.getElementById('search').value.trim();
    fetchData(query);
}

// Fungsi untuk mengedit data
function editData(id) {
    if (!id) {
        console.error('ID tidak valid');
        return;
    }
    window.location.href = `edit_tiket.html?id=${id}`;
}

// Fungsi untuk menampilkan notifikasi sukses edit
function showSuccessEdit() {
    document.getElementById('successEditDialog').style.display = 'flex';
}

// Handle form submit
function handleSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('id_tiket').value;
    const nomor_identitas = document.getElementById('nomor_identitas').value;
    const nama_lengkap = document.getElementById('nama_lengkap').value;
    const jumlah = document.getElementById('jumlah_tiket').value;
    const total = document.getElementById('total_harga').value;

    if (!id || !nomor_identitas || !nama_lengkap || !jumlah) {
        showErrorDialog('Semua field harus diisi');
        return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('nomor_identitas', nomor_identitas);
    formData.append('nama_lengkap', nama_lengkap);
    formData.append('jumlah', jumlah);
    formData.append('total', total);

    fetch('edit_tiket.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Response:', result);

        if (result.status === 'success') {
            showSuccessEdit();
        } else {
            throw new Error(result.message || 'Terjadi kesalahan');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorDialog(error.message || 'Gagal mengupdate data');
    });
}

// Fungsi untuk menutup notifikasi sukses edit dan redirect
function handleSuccessEditClose() {
    const successDialog = document.getElementById('successEditDialog');
    if (successDialog) {
        successDialog.remove();
    }
    window.location.href = 'Kelola_tiket.html';
}

// Event listener saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const logoutBtn = document.querySelector('.logout-btn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutDialog();
        });
    }

    if (id) {
        console.log('Loading data for ID:', id);
        loadData(id);

        const editForm = document.getElementById('editForm');
        if (editForm) {
            editForm.addEventListener('submit', handleSubmit);
        }

        const jumlahTiketInput = document.getElementById('jumlah_tiket');
        if (jumlahTiketInput) {
            jumlahTiketInput.addEventListener('input', updateTotal);
        }

    } else {
        fetchData();
        fetchStats();
        setInterval(fetchStats, 30000);
    }

    // Tambahkan event listener untuk tombol Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLogoutDialog();
            closeDeleteDialog();
            closeSuccessDialog();
            closeErrorDialog();
        }
    });
});

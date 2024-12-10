// Fungsi untuk mengambil data pelanggan
function fetchData(query = '') {
    const url = query ? `cari_pelanggan.php?query=${query}` : '/Code Maskuy/Data Base/Kelola_tkt.php';

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
                            <button class="delete-btn" onclick="hapusData(${item.id})">Hapus</button>
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

// Fungsi untuk menampilkan form tambah
function tampilkanForm() {
    document.querySelector('table').style.display = 'none';
    document.querySelector('.add-btn').style.display = 'none';
    document.getElementById('formTambah').style.display = 'block';
}

// Fungsi untuk menangani submit form tambah
function handleTambahSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    fetch('Tambah_pelanggan.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if(result.status === 'success') {
            const popup = document.getElementById('success-popup');
            popup.style.display = 'flex';
        } else {
            alert('Error: ' + (result.message || 'Terjadi kesalahan'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Gagal menambah data: ' + error.message);
    });
}

function closePopup() {
    document.getElementById('success-popup').style.display = 'none';
    window.location.href = 'kelola_pelanggan1.html';
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

// Fungsi untuk menghapus data
function hapusData(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        fetch(`delete_pelanggan.php?id=${id}`, { 
            method: 'GET' 
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            fetchData();
            fetchStats();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal menghapus data: ' + error.message);
        });
    }
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
            alert(result.message);
            window.location.href = 'kelola_pelanggan1.html';
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
});
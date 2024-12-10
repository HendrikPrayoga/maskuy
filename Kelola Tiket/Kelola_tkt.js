// Fungsi untuk mengambil data dari server
function fetchData(query = '') {
    // Mengirimkan query ke search_data.php jika ada pencarian
    const url = query ? `Cari.php?query=${query}` : '/Code Maskuy/Data Base/Kelola_tkt.php';
    
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
            // Setelah memperbarui tabel, update juga statistik
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

            // Perbarui tampilan dengan penanganan null/undefined
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
            // Set nilai default jika terjadi error
            const totalPelanggan = document.getElementById('total-pelanggan');
            const totalPenghasilan = document.getElementById('total-penghasilan');
            
            if (totalPelanggan) totalPelanggan.textContent = '0';
            if (totalPenghasilan) totalPenghasilan.textContent = 'Rp. 0';
        });
}

// Fungsi untuk mengupdate total harga
function updateTotal() {
    const jumlahTiket = parseInt(document.getElementById('jumlah_tiket').value) || 0;
    const hargaTiket = 2000; // Harga tetap 2000
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
            console.log('Data yang diterima:', data); // Debugging
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Isi form dengan data
            const elements = {
                'id_tiket': data.id,
                'nomor_identitas': data.nomor_identitas,
                'nama_lengkap': data.nama_lengkap,
                'jumlah_tiket': data.jumlah,
                'total_harga': data.total
            };

            // Set nilai untuk setiap element
            Object.entries(elements).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.value = value;
                    console.log(`Setting ${id} to ${value}`); // Debug
                } else {
                    console.error(`Element with id '${id}' not found`);
                }
            });
            
            // Update total setelah data dimuat
            updateTotal();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal memuat data: ' + error.message);
        });
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

// Fungsi untuk menghapus data
function hapusData(id) {
    if (!id) {
        console.error('ID tidak valid');
        return;
    }

    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
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
            alert(result);
            fetchData(); // Refresh data setelah penghapusan
            fetchStats(); // Refresh statistik setelah penghapusan
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal menghapus data: ' + error.message);
        });
    }
}

// Handle form submit
function handleSubmit(e) {
    e.preventDefault();
    
    // Dapatkan semua nilai form
    const id = document.getElementById('id_tiket').value;
    const nomor_identitas = document.getElementById('nomor_identitas').value;
    const nama_lengkap = document.getElementById('nama_lengkap').value;
    const jumlah = document.getElementById('jumlah_tiket').value;
    const total = document.getElementById('total_harga').value;

    // Debug: log data yang akan dikirim
    console.log('Data yang akan dikirim:', {
        id, nomor_identitas, nama_lengkap, jumlah, total
    });

    // Validasi data sebelum dikirim
    if (!id || !nomor_identitas || !nama_lengkap || !jumlah) {
        alert('Semua field harus diisi');
        return;
    }

    // Buat FormData object
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
        console.log('Response:', result); // Debug response
        if (result.error) {
            throw new Error(result.error);
        }
        alert('Data berhasil diperbarui');
        window.location.href = 'Kelola_tiket1.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Gagal mengupdate data: ' + error.message);
    });
}

// Event listener saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah ini halaman edit atau halaman utama
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Tambahkan event listener untuk tombol logout
    const logoutBtn = document.querySelector('.logout-btn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutDialog();
        });
    }
    
    if (id) {
        // Ini halaman edit
        console.log('Loading data for ID:', id); // Debug
        loadData(id);
        
        // Tambahkan event listener untuk form
        const editForm = document.getElementById('editForm');
        if (editForm) {
            editForm.addEventListener('submit', handleSubmit);
        }

        // Tambahkan event listener untuk input jumlah tiket
        const jumlahTiketInput = document.getElementById('jumlah_tiket');
        if (jumlahTiketInput) {
            jumlahTiketInput.addEventListener('input', updateTotal);
        }
    } else {
        // Ini halaman utama
        fetchData();
        fetchStats();
        setInterval(fetchStats, 30000);
    }
});
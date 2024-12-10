// Tunggu sampai DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua elemen FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Tambahkan event listener untuk setiap pertanyaan
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Ambil parent element (faq-item)
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains('active');
            
            // Tutup semua FAQ yang terbuka
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Buka FAQ yang diklik jika sebelumnya tertutup
            if (!isOpen) {
                faqItem.classList.add('active');
            }
        });
    });

    // Fungsi untuk membuat menu mobile
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const mobileButton = document.createElement('button');
        mobileButton.className = 'mobile-menu-button';
        mobileButton.innerHTML = `
            <span class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </span>
        `;

        // Tambahkan tombol ke navigasi
        navContainer.appendChild(mobileButton);

        // Event listener untuk tombol mobile
        mobileButton.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
            mobileButton.classList.toggle('active');
        });

        // Tutup menu saat mengklik di luar
        document.addEventListener('click', (event) => {
            const navLinks = document.querySelector('.nav-links');
            const isClickInside = navContainer.contains(event.target);

            if (!isClickInside && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                mobileButton.classList.remove('active');
            }
        });
    }

    // Panggil fungsi menu mobile
    createMobileMenu();

    // Tambahkan smooth scroll untuk link anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Tambahkan animasi saat scroll
    const addScrollAnimation = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1
        });

        // Amati semua item FAQ untuk animasi
        document.querySelectorAll('.faq-item').forEach(item => {
            observer.observe(item);
        });
    };

    // Panggil fungsi animasi scroll
    addScrollAnimation();

    // Tambahkan keyboard navigation
    document.addEventListener('keydown', (e) => {
        const activeItem = document.querySelector('.faq-item.active');
        
        if (e.key === 'Escape' && activeItem) {
            activeItem.classList.remove('active');
            return;
        }

        if (e.key === 'Tab' && activeItem) {
            const allItems = Array.from(document.querySelectorAll('.faq-item'));
            const currentIndex = allItems.indexOf(activeItem);
            const nextIndex = (currentIndex + 1) % allItems.length;
            
            activeItem.classList.remove('active');
            allItems[nextIndex].classList.add('active');
            e.preventDefault();
        }
    });

    // Tambahkan penanganan error
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + error);
        return false;
    };

    // Optimasi performa dengan debouncing untuk event scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            // Kode yang dijalankan saat scroll
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    });
});
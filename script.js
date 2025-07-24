// DEVGERO - Sistema de Estudos Colaborativo
// JavaScript Principal

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const filterTabs = document.querySelectorAll('.filter-tab');
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('video-modal');
const modalClose = document.querySelector('.modal-close');
const videoIframe = document.getElementById('video-iframe');

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupVideoFilters();
    setupVideoModal();
    setupSmoothScrolling();
    setupAnimations();
    setupDownloadButtons();
    
    // Check for admin access
    checkAdminAccess();
}

// Navigation Functions
function setupNavigation() {
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Video Filter Functions
function setupVideoFilters() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Filter videos
            const filter = tab.getAttribute('data-filter');
            filterVideos(filter);
        });
    });
}

function filterVideos(category) {
    videoCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// Video Modal Functions
function setupVideoModal() {
    // Open modal when clicking video cards
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = getYouTubeVideoId(card);
            if (videoId) {
                openVideoModal(videoId);
            }
        });
    });

    // Close modal
    modalClose?.addEventListener('click', closeVideoModal);
    videoModal?.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
}

function getYouTubeVideoId(card) {
    // For demo purposes, using a default video ID
    // In real implementation, this would come from data attributes
    return 'dQw4w9WgXcQ';
}

function openVideoModal(videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoIframe.src = embedUrl;
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    videoModal.style.display = 'none';
    videoIframe.src = '';
    document.body.style.overflow = 'auto';
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.category-card, .video-card, .book-card, .material-card, .stat-box').forEach(el => {
        observer.observe(el);
    });
}

// Download Functions
function setupDownloadButtons() {
    document.querySelectorAll('.btn-download, .btn-small').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            handleDownload(button);
        });
    });
}

async function handleDownload(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i data-lucide="loader-2"></i> Baixando...';
    button.disabled = true;
    
    try {
        // Get API base URL from deployment config
        const apiBaseUrl = window.DEPLOYMENT_CONFIG?.getApiBaseUrl() || '';
        
        // Get file info from button's parent element
        const fileCard = button.closest('.book-card, .material-card');
        const fileTitle = fileCard?.querySelector('h3')?.textContent || 'file';
        const fileId = fileTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        if (apiBaseUrl) {
            // Call real API
            const response = await fetch(`${apiBaseUrl}/api/download?fileId=${fileId}&type=pdf`);
            const data = await response.json();
            
            if (data.success && data.downloadUrl) {
                // Create download link
                const link = document.createElement('a');
                link.href = data.downloadUrl;
                link.download = data.fileName || fileTitle;
                link.click();
            }
        } else {
            // Fallback for local/demo mode
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        button.innerHTML = '<i data-lucide="check"></i> Concluído!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            lucide.createIcons();
        }, 2000);
        
    } catch (error) {
        console.error('Download error:', error);
        button.innerHTML = '<i data-lucide="x"></i> Erro';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            lucide.createIcons();
        }, 2000);
    }
    
    lucide.createIcons();
}

// Admin Functions
function checkAdminAccess() {
    // Check for admin access via URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const adminKey = urlParams.get('admin');
    const storedAdminKey = localStorage.getItem('devgero_admin');
    
    if (adminKey === 'devgero2024' || storedAdminKey === 'devgero2024') {
        localStorage.setItem('devgero_admin', 'devgero2024');
        showAdminPanel();
    }
    
    // Listen for secret key combination (Ctrl+Shift+A)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            promptAdminAccess();
        }
    });
}

function promptAdminAccess() {
    const password = prompt('Digite a senha de administrador:');
    if (password === 'devgero2024') {
        localStorage.setItem('devgero_admin', 'devgero2024');
        showAdminPanel();
    } else if (password !== null) {
        alert('Senha incorreta!');
    }
}

function showAdminPanel() {
    // Create admin button in navigation
    const adminButton = document.createElement('a');
    adminButton.href = '/admin.html';
    adminButton.className = 'nav-link admin-link';
    adminButton.innerHTML = '<i data-lucide="settings"></i> Admin';
    adminButton.style.color = '#f59e0b';
    
    const navMenu = document.getElementById('nav-menu');
    navMenu.appendChild(adminButton);
    
    lucide.createIcons();
    
    // Show admin notification
    showNotification('Modo administrador ativado!', 'success');
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(notificationStyles);

// Search Functionality
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar materiais...';
    searchInput.className = 'search-input';
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchContent(query);
    });
}

function searchContent(query) {
    const searchableElements = document.querySelectorAll('.video-card, .book-card, .material-card');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Category Navigation
function setupCategoryNavigation() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Navigate to videos section and filter
            document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                // Update filter tabs
                filterTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('data-filter') === category) {
                        tab.classList.add('active');
                    }
                });
                
                // Filter videos
                filterVideos(category);
            }, 500);
        });
    });
}

// Initialize category navigation
document.addEventListener('DOMContentLoaded', () => {
    setupCategoryNavigation();
});

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImages);

// Export functions for potential use in admin panel
window.DEVGERO = {
    showNotification,
    filterVideos,
    openVideoModal,
    closeVideoModal
};

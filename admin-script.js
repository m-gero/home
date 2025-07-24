// DEVGERO Admin Panel JavaScript
// Admin functionality and UI management

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeAdminPanel();
    checkAdminAuth();
});

// Check admin authentication
function checkAdminAuth() {
    const adminKey = localStorage.getItem('devgero_admin');
    if (adminKey !== 'devgero2024') {
        window.location.href = 'index.html';
        return;
    }
}

// Initialize admin panel
function initializeAdminPanel() {
    setupNavigation();
    setupSearch();
    setupFileUpload();
    setupFormHandlers();
    loadDashboardData();
}

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Show target section
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetId) {
                        section.classList.add('active');
                    }
                });
            }
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInputs = document.querySelectorAll('[id$="-search"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const searchType = input.id.replace('-search', '');
            performSearch(query, searchType);
        });
    });
}

function performSearch(query, type) {
    let items;
    
    switch(type) {
        case 'video':
            items = document.querySelectorAll('#videos-table tr');
            break;
        case 'book':
            items = document.querySelectorAll('#books-grid .content-card');
            break;
        case 'material':
            items = document.querySelectorAll('#materials-list .material-item');
            break;
    }
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// File upload setup
function setupFileUpload() {
    const fileUploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('content-file');
    
    if (fileUploadArea && fileInput) {
        // Drag and drop events
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileSelect(files[0]);
            }
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }
}

function handleFileSelect(file) {
    const fileUploadText = document.querySelector('.file-upload-text');
    const fileName = file.name;
    const fileSize = formatFileSize(file.size);
    
    fileUploadText.innerHTML = `
        <i data-lucide="file-check"></i>
        <p><strong>${fileName}</strong></p>
        <span>${fileSize}</span>
    `;
    
    lucide.createIcons();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Form handlers
function setupFormHandlers() {
    const uploadForm = document.getElementById('upload-form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Delete buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-icon.delete')) {
            handleDelete(e.target.closest('.btn-icon.delete'));
        }
        
        if (e.target.closest('.btn-icon.edit')) {
            handleEdit(e.target.closest('.btn-icon.edit'));
        }
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<div class="spinner"></div> Publicando...';
    submitBtn.disabled = true;
    
    try {
        // Simulate upload progress
        await simulateUpload();
        
        // In real implementation, this would call Vercel API
        // const response = await fetch('/api/upload', {
        //     method: 'POST',
        //     body: formData
        // });
        
        showNotification('Conteúdo publicado com sucesso!', 'success');
        closeUploadModal();
        refreshContent();
        
    } catch (error) {
        console.error('Upload error:', error);
        showNotification('Erro ao publicar conteúdo. Tente novamente.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function simulateUpload() {
    const progressBar = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const progressContainer = document.getElementById('upload-progress');
    
    progressContainer.style.display = 'block';
    
    for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        progressBar.style.width = i + '%';
        progressText.textContent = i + '%';
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
}

function handleDelete(button) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        const row = button.closest('tr') || button.closest('.content-card') || button.closest('.material-item');
        if (row) {
            row.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                row.remove();
                showNotification('Item excluído com sucesso!', 'success');
                updateStats();
            }, 300);
        }
    }
}

function handleEdit(button) {
    // Get item data
    const row = button.closest('tr') || button.closest('.content-card') || button.closest('.material-item');
    const title = row.querySelector('h3')?.textContent || row.querySelector('.content-info span')?.textContent;
    
    // Pre-fill form with existing data
    document.getElementById('content-title').value = title || '';
    
    // Open modal
    openUploadModal('edit');
}

// Modal functions
function openUploadModal(type) {
    const modal = document.getElementById('upload-modal');
    const modalTitle = document.getElementById('modal-title');
    const fileUploadGroup = document.getElementById('file-upload-group');
    const videoUrlGroup = document.getElementById('video-url-group');
    
    // Reset form
    document.getElementById('upload-form').reset();
    resetFileUpload();
    
    // Configure modal based on type
    switch(type) {
        case 'video':
            modalTitle.textContent = 'Adicionar Vídeo';
            fileUploadGroup.style.display = 'block';
            videoUrlGroup.style.display = 'block';
            break;
        case 'book':
            modalTitle.textContent = 'Adicionar Livro';
            fileUploadGroup.style.display = 'block';
            videoUrlGroup.style.display = 'none';
            break;
        case 'material':
            modalTitle.textContent = 'Adicionar Material';
            fileUploadGroup.style.display = 'block';
            videoUrlGroup.style.display = 'none';
            break;
        case 'edit':
            modalTitle.textContent = 'Editar Conteúdo';
            break;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('upload-form').reset();
    resetFileUpload();
}

function resetFileUpload() {
    const fileUploadText = document.querySelector('.file-upload-text');
    fileUploadText.innerHTML = `
        <i data-lucide="upload-cloud"></i>
        <p>Clique para selecionar ou arraste o arquivo aqui</p>
        <span>Suporte para PDF, MP4, AVI, MOV</span>
    `;
    lucide.createIcons();
}

// Dashboard data loading
function loadDashboardData() {
    // In real implementation, this would fetch from API
    updateStats();
    loadRecentActivity();
}

function updateStats() {
    // Count current items
    const videoCount = document.querySelectorAll('#videos-table tr').length;
    const bookCount = document.querySelectorAll('#books-grid .content-card').length;
    const materialCount = document.querySelectorAll('#materials-list .material-item').length;
    
    // Update display
    document.getElementById('total-videos').textContent = videoCount;
    document.getElementById('total-books').textContent = bookCount;
    document.getElementById('total-materials').textContent = materialCount;
}

function loadRecentActivity() {
    // This would typically load from an API
    // For now, the activity is static in HTML
}

function refreshContent() {
    // Refresh all content sections
    updateStats();
    loadRecentActivity();
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Logout function
function logout() {
    if (confirm('Tem certeza que deseja sair do painel administrativo?')) {
        localStorage.removeItem('devgero_admin');
        window.location.href = 'index.html';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('upload-modal');
    if (e.target === modal) {
        closeUploadModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('upload-modal');
        if (modal.style.display === 'block') {
            closeUploadModal();
        }
    }
});

// Add fade out animation
const fadeOutStyles = document.createElement('style');
fadeOutStyles.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(fadeOutStyles);

// Export functions for global access
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.logout = logout;

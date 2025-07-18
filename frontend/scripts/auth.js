/**
 * Unified AI Solutions - SaaS Platform Authentication
 * Level 0 God Admin Authentication System
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.currentView = 'god-login';
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showView('god-login');
        
        // Check for existing session
        this.checkSession();
    }

    bindEvents() {
        // God login form
        const godLoginForm = document.getElementById('god-login-form');
        if (godLoginForm) {
            godLoginForm.addEventListener('submit', (e) => this.handleGodLogin(e));
        }

        // Business creation form
        const businessForm = document.getElementById('business-creation-form');
        if (businessForm) {
            businessForm.addEventListener('submit', (e) => this.handleBusinessCreation(e));
        }

        // Company search
        const companySearch = document.getElementById('company-search');
        if (companySearch) {
            companySearch.addEventListener('input', (e) => this.handleCompanySearch(e));
        }

        // Switch buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.switch-btn')) {
                this.handleCompanySwitch(e);
            }
        });

        // Input focus effects
        this.bindInputEffects();
    }

    bindInputEffects() {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                if (input.value.trim() === '') {
                    input.parentElement.classList.remove('filled');
                } else {
                    input.parentElement.classList.add('filled');
                }
            });

            // Check initial state
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('filled');
            }
        });
    }

    async handleGodLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('god-username').value;
        const password = document.getElementById('god-password').value;
        const twoFA = document.getElementById('god-2fa').value;
        
        // Validate inputs
        if (!username || !password || !twoFA) {
            this.showError('All fields are required for God-level access');
            return;
        }

        // Show loading state
        this.setButtonLoading('god-login-form', true);

        try {
            // Simulate authentication (replace with actual API call)
            await this.authenticateGodUser(username, password, twoFA);
            
            // Success
            this.showSuccess('God-level access granted');
            this.currentUser = {
                id: 'god_admin',
                username: username,
                role: 'god_admin',
                permissions: ['all']
            };
            this.isAuthenticated = true;
            
            // Show dashboard
            setTimeout(() => {
                this.showView('god-dashboard');
            }, 1000);
            
        } catch (error) {
            this.showError(error.message || 'Authentication failed');
        } finally {
            this.setButtonLoading('god-login-form', false);
        }
    }

    async authenticateGodUser(username, password, twoFA) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Demo credentials for testing
                if (username === 'god_admin' && password === 'unified_ai_2025' && twoFA === '123456') {
                    resolve({ success: true, token: 'god_token_123' });
                } else {
                    reject(new Error('Invalid God-level credentials'));
                }
            }, 2000);
        });
    }

    async handleBusinessCreation(e) {
        e.preventDefault();
        
        const formData = {
            companyName: document.getElementById('company-name').value,
            companyDomain: document.getElementById('company-domain').value,
            companySize: document.getElementById('company-size').value,
            ownerName: document.getElementById('owner-name').value,
            ownerEmail: document.getElementById('owner-email').value,
            ownerPassword: document.getElementById('owner-password').value,
            ownerPhone: document.getElementById('owner-phone').value
        };

        // Validate required fields
        const required = ['companyName', 'companySize', 'ownerName', 'ownerEmail', 'ownerPassword'];
        for (const field of required) {
            if (!formData[field]) {
                this.showError(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
                return;
            }
        }

        // Validate email format
        if (!this.isValidEmail(formData.ownerEmail)) {
            this.showError('Please enter a valid email address');
            return;
        }

        this.setButtonLoading('business-creation-form', true);

        try {
            await this.createBusinessAccount(formData);
            this.showSuccess('Business account created successfully!');
            
            // Reset form
            document.getElementById('business-creation-form').reset();
            
            // Go back to dashboard
            setTimeout(() => {
                this.showView('god-dashboard');
            }, 2000);
            
        } catch (error) {
            this.showError(error.message || 'Failed to create business account');
        } finally {
            this.setButtonLoading('business-creation-form', false);
        }
    }

    async createBusinessAccount(formData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success for demo
                console.log('Creating business account:', formData);
                resolve({ success: true, businessId: Date.now() });
            }, 2000);
        });
    }

    handleCompanySearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        const companyItems = document.querySelectorAll('.company-item');
        
        companyItems.forEach(item => {
            const companyName = item.querySelector('h4').textContent.toLowerCase();
            const companyDomain = item.querySelector('p').textContent.toLowerCase();
            
            if (companyName.includes(searchTerm) || companyDomain.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    async handleCompanySwitch(e) {
        const companyItem = e.target.closest('.company-item');
        const companyName = companyItem.querySelector('h4').textContent;
        
        const switchBtn = e.target.closest('.switch-btn');
        const originalText = switchBtn.innerHTML;
        
        // Show loading
        switchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Switching...';
        switchBtn.disabled = true;
        
        try {
            // Simulate company switch
            await this.switchToCompany(companyName);
            this.showSuccess(`Switched to ${companyName} profile`);
            
            // In a real app, this would redirect to the company's portal
            console.log(`Switched to company: ${companyName}`);
            
        } catch (error) {
            this.showError(`Failed to switch to ${companyName}`);
        } finally {
            switchBtn.innerHTML = originalText;
            switchBtn.disabled = false;
        }
    }

    async switchToCompany(companyName) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, companyId: Date.now() });
            }, 1500);
        });
    }

    showView(viewId) {
        // Hide all views
        const views = ['god-login', 'god-dashboard', 'create-business', 'company-switch'];
        views.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('active');
                element.classList.add('hidden');
            }
        });

        // Show target view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }

        this.currentView = viewId;
    }

    setButtonLoading(formId, loading) {
        const form = document.getElementById(formId);
        const button = form.querySelector('.auth-btn');
        
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 16px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            margin-left: auto;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'error': return 'fa-exclamation-circle';
            case 'success': return 'fa-check-circle';
            default: return 'fa-info-circle';
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    checkSession() {
        // Check for existing session (in a real app, check localStorage/sessionStorage)
        const savedSession = localStorage.getItem('god_session');
        if (savedSession) {
            try {
                const session = JSON.parse(savedSession);
                if (session.expires > Date.now()) {
                    this.currentUser = session.user;
                    this.isAuthenticated = true;
                    this.showView('god-dashboard');
                }
            } catch (error) {
                localStorage.removeItem('god_session');
            }
        }
    }

    saveSession() {
        if (this.isAuthenticated && this.currentUser) {
            const session = {
                user: this.currentUser,
                expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            };
            localStorage.setItem('god_session', JSON.stringify(session));
        }
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('god_session');
        this.showView('god-login');
        this.showSuccess('Logged out successfully');
        
        // Reset forms
        document.querySelectorAll('form').forEach(form => form.reset());
    }
}

// Global functions for button clicks
function showCreateBusiness() {
    authManager.showView('create-business');
}

function showCompanySwitch() {
    authManager.showView('company-switch');
}

function showGodDashboard() {
    authManager.showView('god-dashboard');
}

function logout() {
    authManager.logout();
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .input-group.focused .input-icon {
        color: var(--god-gold) !important;
    }
    
    .input-group.filled input {
        border-color: var(--gray-300);
    }
`;
document.head.appendChild(style);
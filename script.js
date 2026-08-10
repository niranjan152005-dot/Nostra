/* ===== PRODUCT DATA ===== */
const allProducts = [
    { id: 1, name: 'Summer Breeze Shirt', category: 'Fashion', price: 89.99, rating: 5, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
    { id: 2, name: 'Urban Jacket', category: 'Fashion', price: 149.99, rating: 5, image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop' },
    { id: 3, name: 'Casual Tee', category: 'Fashion', price: 39.99, rating: 4, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
    { id: 4, name: 'Minimalist Watch', category: 'Accessories', price: 149.99, rating: 5, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop' },
    { id: 5, name: 'Leather Belt', category: 'Accessories', price: 59.99, rating: 4, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
    { id: 6, name: 'Silk Scarf', category: 'Accessories', price: 79.99, rating: 5, image: 'https://images.unsplash.com/photo-1582142835016-54a1de5eb5a9?w=400&h=400&fit=crop' },
    { id: 7, name: 'Premium Leather Bag', category: 'Lifestyle', price: 199.99, rating: 5, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
    { id: 8, name: 'Travel Backpack', category: 'Lifestyle', price: 129.99, rating: 4, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
    { id: 9, name: 'Home Candle Set', category: 'Lifestyle', price: 45.99, rating: 5, image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=400&fit=crop' },
    { id: 10, name: 'Classic White Sneakers', category: 'Footwear', price: 129.99, rating: 5, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' },
    { id: 11, name: 'Leather Loafers', category: 'Footwear', price: 189.99, rating: 4, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop' },
    { id: 12, name: 'Sports Running Shoes', category: 'Footwear', price: 119.99, rating: 5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    { id: 13, name: 'Evening Gown', category: 'Fashion', price: 249.99, rating: 5, image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop' },
    { id: 14, name: 'Denim Jeans', category: 'Fashion', price: 99.99, rating: 4, image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop' },
    { id: 15, name: 'Designer Sunglasses', category: 'Accessories', price: 159.99, rating: 5, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop' },
    { id: 16, name: 'Wool Coat', category: 'Fashion', price: 299.99, rating: 5, image: 'https://images.unsplash.com/photo-1539533057143-f0ce3ff92fa5?w=400&h=400&fit=crop' },
];

/* ===== DOM ELEMENTS ===== */
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.querySelectorAll('.category-filter');
const priceFilters = document.querySelectorAll('.price-filter');
const ratingFilters = document.querySelectorAll('.rating-filter');
const resetButton = document.getElementById('resetFilters');
const productsGrid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');
const sortSelect = document.getElementById('sortSelect');
const noResults = document.getElementById('noResults');

/* ===== SEARCH FUNCTIONALITY ===== */
function searchProducts(query, products = allProducts) {
    if (!query.trim()) {
        return products;
    }
    
    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
}

/* ===== FILTER FUNCTIONALITY ===== */
function getPriceRange(range) {
    const ranges = {
        '0-50': [0, 50],
        '50-100': [50, 100],
        '100-200': [100, 200],
        '200+': [200, Infinity]
    };
    return ranges[range] || [0, Infinity];
}

function filterProducts(products) {
    // Get selected categories
    const selectedCategories = Array.from(categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Get selected prices
    const selectedPrices = Array.from(priceFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => getPriceRange(checkbox.value));

    // Get selected ratings
    const selectedRatings = Array.from(ratingFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.value));

    // Filter products
    return products.filter(product => {
        // Category filter
        const categoryMatch = selectedCategories.length === 0 || 
                            selectedCategories.includes(product.category);

        // Price filter
        const priceMatch = selectedPrices.length === 0 || 
                          selectedPrices.some(([min, max]) => 
                              product.price >= min && product.price < max);

        // Rating filter
        const ratingMatch = selectedRatings.length === 0 || 
                           selectedRatings.some(rating => 
                               product.rating >= rating);

        return categoryMatch && priceMatch && ratingMatch;
    });
}

/* ===== SORT FUNCTIONALITY ===== */
function sortProducts(products, sortOption) {
    const sorted = [...products];
    
    switch(sortOption) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'popular':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
        default:
            return sorted.sort((a, b) => b.id - a.id);
    }
}

/* ===== RENDER PRODUCTS ===== */
function renderProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
        resultsCount.textContent = 'Showing 0 products';
        return;
    }

    noResults.style.display = 'none';
    resultsCount.textContent = `Showing ${products.length} product${products.length !== 1 ? 's' : ''}`;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <div class="product-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
                <span class="price">$${product.price.toFixed(2)}</span>
            </div>
        </div>
    `).join('');
}

/* ===== UPDATE PRODUCTS DISPLAY ===== */
function updateProducts() {
    const searchQuery = searchInput.value;
    let filtered = searchProducts(searchQuery, allProducts);
    filtered = filterProducts(filtered);
    
    const sortOption = sortSelect.value;
    const sorted = sortProducts(filtered, sortOption);
    
    renderProducts(sorted);
}

/* ===== EVENT LISTENERS ===== */
if (searchInput) {
    searchInput.addEventListener('input', updateProducts);
    searchInput.addEventListener('keyup', updateProducts);
}

categoryFilters.forEach(checkbox => {
    checkbox.addEventListener('change', updateProducts);
});

priceFilters.forEach(checkbox => {
    checkbox.addEventListener('change', updateProducts);
});

ratingFilters.forEach(checkbox => {
    checkbox.addEventListener('change', updateProducts);
});

if (sortSelect) {
    sortSelect.addEventListener('change', updateProducts);
}

if (resetButton) {
    resetButton.addEventListener('click', () => {
        // Reset all checkboxes
        categoryFilters.forEach(checkbox => checkbox.checked = false);
        priceFilters.forEach(checkbox => checkbox.checked = false);
        ratingFilters.forEach(checkbox => checkbox.checked = false);
        
        // Reset search input
        if (searchInput) searchInput.value = '';
        
        // Reset sort
        if (sortSelect) sortSelect.value = 'newest';
        
        // Update display
        updateProducts();
    });
}

/* ===== INITIALIZE PRODUCTS ON COLLECTION PAGE ===== */
if (productsGrid) {
    renderProducts(allProducts);
}

/* ===== CONTACT FORM FUNCTIONALITY ===== */
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Phone validation (optional but if provided, should be valid)
        if (phone && !/^[\d\s\-\+\(\)]{10,}$/.test(phone)) {
            showFormMessage('Please enter a valid phone number.', 'error');
            return;
        }

        // Success message
        showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Log form data (in real application, this would be sent to a server)
        console.log({
            name,
            email,
            phone,
            subject,
            message,
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString()
        });
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

/* ===== NEWSLETTER FORM ===== */
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Success
        alert('Thank you for subscribing! Check your email for special offers.');
        emailInput.value = '';

        // Log subscription (in real application, this would be sent to a server)
        console.log({
            email,
            subscribedAt: new Date().toISOString()
        });
    });
}

/* ===== SMOOTH SCROLLING ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===== ACTIVE NAVIGATION HIGHLIGHTING ===== */
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
window.addEventListener('load', highlightActiveNav);

/* ===== PERFORMANCE: LAZY LOAD PRODUCTS ===== */
const productCards = document.querySelectorAll('.product-card');
if (productCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    productCards.forEach(card => observer.observe(card));
}

/* ===== PREVENT MULTIPLE FORM SUBMISSIONS ===== */
function preventDoubleSubmit(form) {
    if (form) {
        form.addEventListener('submit', function() {
            const button = this.querySelector('button[type="submit"]');
            if (button) {
                button.disabled = true;
                setTimeout(() => button.disabled = false, 2000);
            }
        });
    }
}

preventDoubleSubmit(contactForm);
preventDoubleSubmit(newsletterForm);

/* ===== CONSOLE LOG ===== */
console.log('%c🎨 Nostra E-Commerce Website', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cA modern, responsive shopping experience', 'color: #764ba2; font-size: 12px;');
console.log('%cFeatures: Search, Filter, Sort, Contact Form', 'color: #3498db; font-size: 12px;');
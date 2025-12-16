// Productos
const products = [
    {
        id: 1,
        name: "Aretes Estrella Circón",
        price: 12500,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
        description: "Elegantes aretes con circón brillante en forma de estrella"
    },
    {
        id: 2,
        name: "Aretes Aro Minimalistas",
        price: 8900,
        image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&q=80",
        description: "Aros pequeños y delicados para uso diario"
    },
    {
        id: 3,
        name: "Aretes Colgantes Gota",
        price: 15900,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
        description: "Aretes largos con diseño de gota, perfectos para ocasiones especiales"
    },
    {
        id: 4,
        name: "Aretes Circón Solitario",
        price: 10500,
        image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500&q=80",
        description: "Clásicos aretes con circón solitario brillante"
    },
    {
        id: 5,
        name: "Aretes Aro Medianos",
        price: 11900,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80",
        description: "Aros medianos versátiles para cualquier ocasión"
    },
    {
        id: 6,
        name: "Aretes Corazón",
        price: 13500,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
        description: "Románticos aretes en forma de corazón con detalle brillante"
    }
];

// Estado de la aplicación
let cart = [];
let checkoutStep = 'cart'; // cart, checkout, success
let formData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    comuna: ''
};

// Formatear precio
function formatPrice(price) {
    return `$${price.toLocaleString('es-CL')}`;
}

// Renderizar productos
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i data-lucide="shopping-cart" style="width: 18px; height: 18px;"></i>
                        <span>Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    updateCart();
}

// Remover del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Actualizar UI del carrito
function updateCart() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
    
    renderCartContent();
}

// Renderizar contenido del carrito
function renderCartContent() {
    const cartBody = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    const cartTitle = document.getElementById('cartTitle');
    
    if (checkoutStep === 'cart') {
        cartTitle.textContent = 'Tu Carrito';
        
        if (cart.length === 0) {
            cartBody.innerHTML = `
                <div class="cart-empty">
                    <i data-lucide="shopping-cart" style="width: 64px; height: 64px;"></i>
                    <p style="color: var(--text-secondary);">Tu carrito está vacío</p>
                </div>
            `;
            cartFooter.innerHTML = '';
        } else {
            cartBody.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                        <div class="cart-item-controls">
                            <button class="btn-quantity" onclick="updateQuantity(${item.id}, -1)">
                                <i data-lucide="minus" style="width: 16px; height: 16px;"></i>
                            </button>
                            <span style="font-weight: 600;">${item.quantity}</span>
                            <button class="btn-quantity" onclick="updateQuantity(${item.id}, 1)">
                                <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                            </button>
                            <button class="btn-remove" onclick="removeFromCart(${item.id})">
                                <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cartFooter.innerHTML = `
                <div class="cart-total">
                    <span class="cart-total-label">Total:</span>
                    <span class="cart-total-price">${formatPrice(total)}</span>
                </div>
                <button class="btn-checkout" onclick="goToCheckout()">Continuar al Checkout</button>
            `;
        }
    } else if (checkoutStep === 'checkout') {
        cartTitle.textContent = 'Datos de Envío';
        
        cartBody.innerHTML = `
            <form class="checkout-form" id="checkoutForm">
                <div class="form-group">
                    <label class="form-label">Nombre completo *</label>
                    <input type="text" name="name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Email *</label>
                    <input type="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Teléfono *</label>
                    <input type="tel" name="phone" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Dirección</label>
                    <input type="text" name="address" class="form-input">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Comuna</label>
                        <input type="text" name="comuna" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Ciudad</label>
                        <input type="text" name="city" class="form-input">
                    </div>
                </div>
                
                <div class="payment-methods">
                    <h4>Método de Pago:</h4>
                    <button type="button" class="btn-payment btn-flow" onclick="handleCheckout('Flow')">
                        Pagar con Flow
                    </button>
                    <button type="button" class="btn-payment btn-mercadopago" onclick="handleCheckout('Mercado Pago')">
                        Pagar con Mercado Pago
                    </button>
                    <button type="button" class="btn-payment btn-whatsapp" onclick="handleCheckout('whatsapp')">
                        Coordinar pago por WhatsApp
                    </button>
                </div>
            </form>
        `;
        
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartFooter.innerHTML = `
            <div class="cart-total">
                <span class="cart-total-label">Total:</span>
                <span class="cart-total-price">${formatPrice(total)}</span>
            </div>
            <button class="btn-back" onclick="backToCart()">← Volver al Carrito</button>
        `;
    } else if (checkoutStep === 'success') {
        cartTitle.textContent = '¡Pedido Realizado!';
        
        cartBody.innerHTML = `
            <div class="cart-success">
                <div class="success-icon">✅</div>
                <h4 class="success-title">¡Gracias por tu pedido!</h4>
                <p class="success-message">Hemos recibido tu solicitud. Te contactaremos pronto por WhatsApp para coordinar el pago y envío.</p>
                <button class="btn-checkout" onclick="continueShopping()">Seguir Comprando</button>
            </div>
        `;
        
        cartFooter.innerHTML = '';
    }
    
    lucide.createIcons();
}

// Ir al checkout
function goToCheckout() {
    checkoutStep = 'checkout';
    renderCartContent();
}

// Volver al carrito
function backToCart() {
    checkoutStep = 'cart';
    renderCartContent();
}

// Procesar checkout
function handleCheckout(paymentMethod) {
    const form = document.getElementById('checkoutForm');
    const formDataObj = new FormData(form);
    
    formData.name = formDataObj.get('name');
    formData.email = formDataObj.get('email');
    formData.phone = formDataObj.get('phone');
    formData.address = formDataObj.get('address');
    formData.city = formDataObj.get('city');
    formData.comuna = formDataObj.get('comuna');
    
    if (!formData.name || !formData.email || !formData.phone) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderDetails = `
*NUEVO PEDIDO - MOPI JEWELRY* 💎

*Cliente:*
${formData.name}
📧 ${formData.email}
📱 ${formData.phone}
${formData.address ? `📍 ${formData.address}, ${formData.comuna}, ${formData.city}` : ''}

*Productos:*
${cart.map(item => `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`).join('\n')}

*TOTAL: ${formatPrice(total)}*

Método de pago: ${paymentMethod}
    `.trim();
    
    const whatsappMessage = encodeURIComponent(orderDetails);
    const whatsappNumber = '56912345678'; // CAMBIA ESTO POR TU NÚMERO
    
    if (paymentMethod === 'whatsapp') {
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    } else {
        alert(`En breve serás redirigido a ${paymentMethod} para completar tu pago.\n\n(Funcionalidad en desarrollo - Por ahora contacta por WhatsApp)`);
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    }
    
    checkoutStep = 'success';
    renderCartContent();
}

// Continuar comprando
function continueShopping() {
    cart = [];
    checkoutStep = 'cart';
    formData = { name: '', email: '', phone: '', address: '', city: '', comuna: '' };
    closeCart();
    updateCart();
}

// Abrir/cerrar carrito
function openCart() {
    document.getElementById('cartSidebar').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.add('hidden');
    checkoutStep = 'cart';
    renderCartContent();
}

// Dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Event listeners
document.getElementById('cartButton').addEventListener('click', openCart);
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

// Cargar dark mode guardado
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Inicializar
renderProducts();
updateCart();
# 💎 MOPI Jewelry - Tienda Online

Tienda de joyería de plata ley 925 con diseños únicos y elegantes. E-commerce completo con carrito de compras, checkout y modo oscuro.

## 🌐 Demo en Vivo

**[Ver Tienda](https://mopi-jewelry.netlify.app/)**

## ✨ Características

- 🛒 **Carrito de compras funcional** - Agrega, elimina y modifica cantidades
- 💳 **Múltiples métodos de pago** - Flow, Mercado Pago y WhatsApp
- 🌙 **Modo oscuro** - Cambia entre tema claro y oscuro
- 📱 **Diseño responsive** - Se adapta a celular, tablet y desktop
- ⚡ **Rápido y ligero** - HTML, CSS y JavaScript vanilla
- 🎨 **UI moderna** - Diseño minimalista y elegante

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS para temas)
- JavaScript (ES6+)
- [Lucide Icons](https://lucide.dev/) - Íconos SVG
- Netlify - Hosting

## 📦 Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/TU-USUARIO/mopi-jewelry.git
```

2. Abre la carpeta:
```bash
cd mopi-jewelry
```

3. Abre `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server
```

4. Visita `http://localhost:8000` en tu navegador

## ⚙️ Configuración

### Cambiar número de WhatsApp

Edita `script.js` línea 234:

```javascript
const whatsappNumber = '56912345678'; // Cambia por tu número
```

El formato debe ser: código de país (56 para Chile) + número sin espacios ni caracteres especiales.

### Modificar productos

Edita el array `products` en `script.js` (líneas 1-36):

```javascript
const products = [
    {
        id: 1,
        name: "Nombre del producto",
        price: 12500, // Precio en pesos chilenos
        image: "URL_de_la_imagen",
        description: "Descripción del producto"
    },
    // ... más productos
];
```

### Personalizar colores

Los colores se encuentran en `styles.css` usando variables CSS (líneas 9-40):

```css
:root {
    --bg-primary: #f8fafc;
    --blue-primary: #1e3a8a;
    /* ... más variables */
}
```

## 📁 Estructura del Proyecto

```
mopi-jewelry/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y temas (claro/oscuro)
├── script.js           # Lógica de la tienda y carrito
└── README.md           # Este archivo
```

## 🚀 Deployment en Netlify

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Arrastra la carpeta del proyecto a Netlify
3. ¡Listo! Tu tienda está online

### Conectar un dominio personalizado (opcional)

1. Compra un dominio (ej: mopijewelry.cl)
2. En Netlify: **Domain Settings** → **Add custom domain**
3. Configura los DNS según las instrucciones de Netlify

## 💳 Integración de Pagos

### Flow

1. Crea cuenta en [Flow.cl](https://flow.cl)
2. Obtén tus API keys
3. Implementa la integración según su [documentación](https://www.flow.cl/docs/)

### Mercado Pago

1. Crea cuenta en [Mercado Pago](https://www.mercadopago.cl)
2. Obtén tus credenciales
3. Sigue su [guía de integración](https://www.mercadopago.cl/developers)

**Nota:** Actualmente los botones de Flow y Mercado Pago redirigen a WhatsApp. Para activar los pagos reales, necesitas implementar las APIs respectivas.

## 📝 To-Do / Mejoras Futuras

- [ ] Integrar API de Flow para pagos reales
- [ ] Integrar API de Mercado Pago
- [ ] Agregar sistema de administración de productos
- [ ] Implementar búsqueda y filtros de productos
- [ ] Agregar página de detalles de producto
- [ ] Sistema de reseñas y calificaciones
- [ ] Newsletter/suscripción por email
- [ ] Panel de administración
- [ ] Tracking de pedidos

## 📸 Screenshots

### Vista Desktop (Modo Claro)
![Desktop Light Mode](https://via.placeholder.com/800x400?text=Agrega+screenshot+aquí)

### Vista Mobile (Modo Oscuro)
![Mobile Dark Mode](https://via.placeholder.com/400x600?text=Agrega+screenshot+aquí)

## 👤 Autor

**MOPI Jewelry**
- Instagram: [@mopi.jewelry](https://www.instagram.com/mopi.jewelry)
- Website: [mopi-jewelry.netlify.app](https://mopi-jewelry.netlify.app)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!

💎 **MOPI Jewelry** - Joyería de Plata Ley 925
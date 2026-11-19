# Capitán del Espacio — Web Redesign

Rediseño moderno y responsive del sitio institucional de **Capitán del Espacio** (Quilmes, Buenos Aires), construido con React, Tailwind CSS, Framer Motion y Leaflet, manteniendo una identidad visual coherente en paleta crema (`#fbf3e1`), rojo Capitán (`#8b1d1d`) y marrón espresso (`#26110a`).

## Características principales

* **Identidad visual unificada:** estética cálida y de archivo con fondo patrimonial (`capitan-heritage-bg`), alto contraste tipográfico y componentes adaptados a toda la app.
* **Recorrido interactivo de elaboración (`/elaboracion`):** selector de estaciones (`01` a `07`) con transiciones animadas (`Framer Motion`), vista ampliada del paso activo y tira de miniaturas para saltar entre las ilustraciones (`src/assets/elaboracion/paso1.webp` a `paso7.webp`).
* **Ubicación y contacto (`/contacto`):** formulario de consulta, información institucional de la planta en Quilmes y mapa interactivo con Leaflet (`invalidateSize()`, `ResizeObserver`, pin personalizado y parches de compatibilidad con Tailwind v4 Preflight).
* **Navegación móvil estilo app (`MobileBottomNav`):** barra inferior flotante de 5 accesos (`Inicio`, `Alfajores`, `Historia`, `Proceso` y `Contacto`) con soporte de *safe area* y espaciado inferior en `MainLayout` para evitar solapamientos.
* **Footer compacto:** cierre con identidad de marca, accesos rápidos a secciones y rutas, datos de origen en Quilmes y espaciado ajustado.

## Estructura del proyecto

```text
src/
├── assets/
│   └── elaboracion/       # Ilustraciones paso1.webp a paso7.webp
├── components/
│   └── common/            # Navbar, Footer, MobileBottomNav
├── data/                  # Datos de productos, historia y elaboración
├── layouts/               # MainLayout
└── pages/                 # HomePage, ProductsPage, HistoryPage, ElaborationPage, DistributionPage, ContactPage

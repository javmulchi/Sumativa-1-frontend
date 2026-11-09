# Mercado Central — Desarrollo Frontend II (PFY2202)

Aplicación frontend para gestionar el inventario de un supermercado. Esta versión integra las funcionalidades solicitadas en las semanas 1, 2 y 3: navegación entre secciones, ingreso de artículos, listado, filtro por categoría, detalle de productos y carrito sincronizado con el stock.

## Tecnologías

- React 18 y JavaScript (JSX).
- React Router DOM 6: navegación SPA, rutas centralizadas y parámetro dinámico para el detalle del producto.
- React Context y `useReducer`: estado global para inventario y carrito.
- `useState`, `useMemo` y `useEffect` para estados locales, filtrado y persistencia.
- Tailwind CSS 3 para diseño responsive y clases reutilizables con `@apply`.
- Vite como herramienta de desarrollo y compilación.

## Requisitos

- Node.js 18 o superior.
- npm.

## Instalación y ejecución

1. Descomprime el proyecto y abre la carpeta `supermercado-pfy2202-semana3` en Visual Studio Code.
2. Abre una terminal dentro de esa carpeta.
3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia la aplicación:

   ```bash
   npm start
   ```

5. Abre la dirección que muestra la terminal, normalmente `http://localhost:5173`.

Para generar la versión de producción:

```bash
npm run build
```

## Funcionalidades implementadas

### Semana 1 — Navegación con React Router

- Aplicación SPA con navegación sin recargar el documento.
- Rutas centralizadas en `src/routes/AppRoutes.jsx`.
- Layout compartido para mantener la navegación y estructura visual.
- Carga diferida de páginas mediante `React.lazy()` y `Suspense`.
- Ruta dinámica `/productos/:productId` para consultar el detalle de cada artículo.

### Semana 2 — Gestión del inventario

- Estado global de productos mediante Context y `useReducer`.
- Formulario para agregar artículos con nombre, marca, categoría, precio, stock y descripción.
- Tabla con los artículos registrados, código, marca, categoría, precio y stock.
- Persistencia local mediante `localStorage`, para conservar los cambios al recargar el navegador.

### Semana 3 — Filtro, detalle y carrito

- Filtro por categoría y búsqueda por nombre, marca o código.
- El filtro se calcula con `filter()` y `useMemo`; no modifica el arreglo original del inventario.
- Detalle individual del artículo y selección de cantidad.
- Al agregar al carrito, el stock disponible disminuye inmediatamente.
- En el carrito se puede aumentar o disminuir la cantidad. Cada aumento descuenta una unidad y cada disminución devuelve una unidad al inventario.
- La opción **Quitar** elimina el artículo del carrito y devuelve todas sus unidades al inventario.
- No se permite agregar más unidades que las disponibles.

## Estructura del proyecto

```text
src/
├── components/       # Elementos reutilizables y formato de moneda
├── context/          # Context global y reducer del inventario
├── data/             # Categorías y productos iniciales de ejemplo
├── layouts/          # Estructura común de navegación
├── pages/            # Dashboard, inventario, formulario, detalle y carrito
├── routes/           # Configuración centralizada de React Router
├── App.jsx
├── index.css         # Tailwind y clases reutilizables
└── main.jsx
```

## Prueba funcional sugerida

1. Entra a **Inventario** y selecciona una categoría. Comprueba que la tabla se filtre sin eliminar productos.
2. Abre el detalle de un producto y agrega dos unidades al carrito.
3. Regresa al inventario y verifica que el stock disminuyó en dos unidades.
4. Entra al **Carrito**, aumenta una unidad y verifica que el stock disminuya nuevamente.
5. Disminuye una unidad o pulsa **Quitar**. Comprueba que las unidades regresan al inventario.
6. Agrega un artículo nuevo desde **Agregar artículo** y verifica que aparezca en el listado.
7. Recarga la página y comprueba que los datos continúan guardados en el navegador.

## Publicación en GitHub y GitHub Pages

La carpeta incluye un flujo de GitHub Actions en `.github/workflows/deploy.yml`. Este compila y publica el proyecto en GitHub Pages cada vez que se actualiza la rama `main`.

1. Crea un repositorio público con el nombre solicitado por la actividad: `supermercado-nombre-apellido-pfy2202` (reemplaza nombre y apellido por los tuyos).
2. En la terminal, dentro de la carpeta del proyecto, ejecuta:

   ```bash
   git init
   git add .
   git commit -m "Entrega semana 3 PFY2202"
   git branch -M main
   git remote add origin https://github.com/USUARIO/supermercado-nombre-apellido-pfy2202.git
   git push -u origin main
   ```

3. En GitHub, entra a **Settings → Pages** y selecciona **GitHub Actions** como fuente de publicación.
4. Abre la pestaña **Actions** y espera a que el flujo `Deploy to GitHub Pages` termine correctamente.
5. Copia la URL pública de GitHub Pages y la URL del repositorio para compartirlas con el docente.

> Nota: el proyecto utiliza `HashRouter` para que las rutas funcionen correctamente en GitHub Pages, que es un servicio de alojamiento estático.

## Consideraciones

- Los productos iniciales son datos de demostración editables en `src/data/initialProducts.js`.
- La persistencia se realiza en el navegador mediante `localStorage`; no existe una base de datos ni un backend.
- Para comenzar las pruebas desde cero, se puede borrar el almacenamiento local del sitio desde las herramientas de desarrollo del navegador.

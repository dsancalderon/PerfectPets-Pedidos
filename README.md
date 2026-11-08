# Perfect Pets · Clientes y pedidos

Frontend sin dependencias. Ejecutar `npm start` y abrir http://localhost:4173.

Incluye cinco clientes extraídos de las tarjetas originales, seis productos con sus tamaños y precios profesionales en COP, búsqueda, fichas desplegables e historial con creación, edición y eliminación confirmada de pedidos. El formulario admite varios productos, tamaños, cantidades, fecha y notas; el total se calcula automáticamente. No se incluyen pedidos ficticios.

Los pedidos se almacenan en `localStorage` con la clave `perfect-pets.orders.v1`. Son locales a este navegador y origen: no se sincronizan entre equipos ni constituyen una base de datos. El precio unitario se conserva con cada pedido para mantener su valor histórico. No se aplican descuentos ni cargos adicionales.

## Fuentes

- `Tarjetas/`: datos y logos de los cinco clientes. Matius tiene dos sedes, incluidas en su ficha.
- `Precios_Champoo.jpg`: fuente de todos los tamaños y precios. Los acondicionadores incluyen 4, 10 y 20 L según esta tabla, aunque la ficha de productos solo describe 4 L.
- `Productos_Champoo.jpg`: fotografías y descripciones del catálogo.
- `logo_perfect_pets.pdf`: variante horizontal del logo y colores de marca.
- `scripts/extract_assets.py`: recortes de las imágenes originales y del PDF previamente rasterizado en `assets/logo-options.png`.

Validación sintáctica: `npm run check`. El servidor local solo sirve la interfaz y sus imágenes; no recibe ni almacena pedidos.

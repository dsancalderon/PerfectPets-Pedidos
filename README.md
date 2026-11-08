# Perfect Pets · Clientes y pedidos

Frontend sin dependencias. Ejecutar `npm start` y abrir http://localhost:4173.

Incluye cinco clientes extraídos de las tarjetas originales, seis productos con sus tamaños y precios profesionales en COP, búsqueda, fichas desplegables e historial con creación, edición y eliminación confirmada de pedidos. El formulario admite varios productos, tamaños, cantidades, fecha y notas; el total se calcula automáticamente. No se incluyen pedidos ficticios.

En desarrollo local, sin variables de Supabase, los pedidos y clientes nuevos se almacenan en `localStorage`. Al configurar Supabase, la app usa la base de datos compartida y exige iniciar sesión. El precio unitario se conserva con cada pedido para mantener su valor histórico. No se aplican descuentos ni cargos adicionales.

## Supabase y Vercel

1. Ejecuta `supabase/migrations/20261107_000001_app_backend.sql` en el SQL Editor del proyecto Supabase. Crea las tablas, los cinco clientes iniciales y las políticas de acceso.
2. En Supabase → Authentication → Users, crea el usuario que tendrá acceso a la app. Después, en SQL Editor, ejecuta `insert into public.app_members (user_id) select id from auth.users where email = 'TU_CORREO';` con su correo real. Solo usuarios incluidos en `app_members` podrán leer y modificar clientes y pedidos.
3. En Supabase → Settings → API Keys, copia una **publishable key** activa. Nunca uses la secret key o `service_role` en esta app.
4. En Vercel, importa `dsancalderon/PerfectPets-Pedidos` desde GitHub, selecciona **Other** como framework y deja el directorio raíz en `./`. Agrega las variables `SUPABASE_URL` (URL del proyecto, por ejemplo `https://ppuviqsnkbiltowrhxdc.supabase.co`) y `SUPABASE_PUBLISHABLE_KEY`. Despliega el proyecto. La función `/api/config` entrega al navegador únicamente estos valores públicos.
5. Abre la URL de Vercel e inicia sesión con el usuario creado. Para desarrollo local con Supabase, define las mismas variables de entorno antes de ejecutar `npm start`.

Los datos anteriores de `localStorage` no se copian automáticamente a Supabase. Conserva el navegador donde están guardados hasta migrarlos. Los cambios en variables de Vercel requieren un nuevo despliegue.

## Fuentes

- `Tarjetas/`: datos y logos de los cinco clientes. Matius tiene dos sedes, incluidas en su ficha.
- `Precios_Champoo.jpg`: fuente de todos los tamaños y precios. Los acondicionadores incluyen 4, 10 y 20 L según esta tabla, aunque la ficha de productos solo describe 4 L.
- `Productos_Champoo.jpg`: fotografías y descripciones del catálogo.
- `logo_perfect_pets.pdf`: variante horizontal del logo y colores de marca.
- `scripts/extract_assets.py`: recortes de las imágenes originales y del PDF previamente rasterizado en `assets/logo-options.png`.

Validación sintáctica: `npm run check`. El servidor local solo sirve la interfaz y sus imágenes; no recibe ni almacena pedidos.

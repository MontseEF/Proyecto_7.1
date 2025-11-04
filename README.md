🧰 Backend — Ferretería Zona Franca (API)

Backend del proyecto e-commerce "Ferretería Zona Franca".
Provee servicios de autenticación, productos y carrito usando JWT + cookies httpOnly.

---------------------------

🚀 Tecnologías

- Node.js

- Express

- MongoDB Atlas + Mongoose

- JWT Authentication

- Cookies httpOnly

- CORS con credenciales

--------------------------------------------------------------

📦 Requisitos

- Node v18+

- Cuenta MongoDB Atlas (o Mongo local)

- Archivo .env configurado

- Frontend (React + Vite) funcionando aparte

-----------------------------------------------------------

📁 Instalación

git clone https://github.com/MontseEF/Proyecto_7.1.git
cd Proyecto_7.1/backend
npm install

----------------------------------------------------------

🔧 Variables de entorno (.env)

Crear archivo .env en /backend con:

PORT=3000
MONGO_URI=TU_URI_MONGO
JWT_SECRET=una_clave_secreta_segura
CORS_ORIGIN=http://localhost:5173

Producción (Netlify + Render)
CORS_ORIGIN=https://tu-sitio.netlify.app

---------------------------------------------------------------

▶️ Ejecutar en desarrollo

npm run dev


Servidor local:

http://localhost:3000

---------------------------------------------------------

🌎 Endpoints principales


🔐 Auth
Método	Ruta	Descripción
POST	/api/auth/register	Registrar usuario
POST	/api/auth/login	Login, crea cookie
POST	/api/auth/logout	Cerrar sesión
GET	/api/auth/me	Usuario autenticado

🛒 Productos
Método	Ruta	Descripción
GET	/api/products	Listar productos
GET	/api/products/:id	Detalle de producto

Agrega rutas POST/PUT si tienes panel admin

🔐 Seguridad

Cookies httpOnly

sameSite: "none" + secure: true para producción

CORS con credentials: true

Ejemplo configuración CORS:

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

🏗️ Deploy en Render

Type: Web Service

Start Command:

node src/server.js

⚙️ Env vars en Render

PORT

MONGO_URI

JWT_SECRET

CORS_ORIGIN

-------------------------------------------------

📜 Scripts útiles

npm run dev   // desarrollo
npm start     // producción

-------------------------------------------------------

🗂️ Estructura del proyecto

backend/
  src/
    controllers/
    models/
    routes/
    middleware/
    server.js
  package.json
  .env
------------------------------------------------------------------------------------

🛠️ Próximas mejoras

- Panel administrador

- CRUD de productos

- Subida de imágenes

- Carrito persistente en BD

- Historial de compras

-------------------------------------------------------------------------------------

👩‍💻 Autora

Montserrat Espinoza Flores
Proyecto Full Stack

GitHub: https://github.com/MontseEF
Proyecto Full Stack

GitHub: https://github.com/MontseEF

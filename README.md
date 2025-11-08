# 📋 Uptask - Aplicación Web para la Gestión de Proyectos y Tareas Colaborativas 📋 

<p align="justify">
  <b>Uptask</b> es una aplicación Full Stack diseñada para equipos que buscan gestionar proyectos y tareas de forma organizada y colaborativa. Permite crear proyectos, asignar tareas, controlar el progreso y administrar los usuarios que participan en cada uno, con una interfaz moderna, segura y totalmente responsiva.
</p>

🔗 **[Ver página en vivo](https://uptask-full-stack-mern.vercel.app)**

---

## 🔑 Usuario de Ejemplo

- **Usuario:** testuserexamplepk@gmail.com
- **Clave:** password123

---

## 🚀 Características

- Autenticación de usuario (registro e inicio de sesión).
- Validación de formularios en frontend y backend.
- Gestión completa de proyectos (crear, editar, eliminar).
- Creación y administración de tareas dentro de cada proyecto.
- Control de usuarios participantes en proyectos colaborativos.
- Token JWT para protección de rutas y sesiones seguras.
- Interfaz responsiva con diseño moderno.
- Implementación de React Query para un manejo eficiente del estado y las peticiones.

---

## 🛠️ Tecnologías Utilizadas

### Frontend:
- React
- React Router
- React Query
- Tailwind CSS

### Backend:
- Node.js
- Express
- TypeScript
- JavaScript
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt

---

## ⚡ Instalación y Ejecución Local

#### Clonar el repositorio
```bash
git clone https://github.com/DavidPK8/Uptask-FullStack-MERN.git
```

#### Configurar variables de entorno (.env) | En la carpeta /server crea un archivo .env con los siguientes valores:
```bash
PORT=4000
DATABASE_URL=tu_conexion_mongodb
JWT_SECRET=tu_secreto
```

#### Instalar dependencias del frontend
```bash
cd client
npm install
```

#### Ejecutar el frontend
```bash
npm run dev
```

#### Instalar dependencias del backend
```bash
cd ../server
npm install
```

#### Ejecutar el backend
```bash
npm run dev
```

---

## 📂 Estructura del Proyecto

```plaintext
Uptask/
 ├── server/
 │   ├── src/
 │       ├── config/
 │       ├── controllers/
 │       ├── emails/
 │       ├── middlewares/
 |       ├── models/
 |       ├── routes/
 |       ├── utils/
 |   |── index.ts
 |   |── server.ts
 ├── client/
 │   ├── src/
 |       |── api/
 |       |── components/
 |       |── hooks/
 |       |── layouts/
 |       |── lib/
 |       |── locales/
 |       |── types/
 |       |── utils/
 |       |── views/
 │       |── index.css
 |       |── main.tsx
 |       |── router.tsx
 └── README.md
```

---

## 📸 Capturas de pantalla

### Inicio de sesión
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/d41c10f4-3147-4b49-9cfe-4db0dd8b4351" />

### Registro
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/13b923b7-877e-4414-a5a5-5041cb66df51" />

### Correo de Confirmacion
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/80278f92-8df9-4b4b-ac0a-26166c9d25b3" />

### Confirmar Cuenta
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/fc74a6db-2aad-4716-a0d3-c3f8b33a5de8" />

### Dashboard de Proyectos
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/676f71bb-4467-4555-adfd-f3a61e6022bb" />

### Vista de Tareas
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/e65e50dc-da3f-49ce-8d6b-6d369db7fc63" />

### Vista de Miembros
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/7b026b3c-4acb-48e4-8dde-a5648f661a70" />

### Vista de Perfil
<img width="1872" height="900" alt="image" src="https://github.com/user-attachments/assets/d10b39db-d392-4cd3-8668-d997f00b59e4" />

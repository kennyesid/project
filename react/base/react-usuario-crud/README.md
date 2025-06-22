# Proyecto con React + Tailwind + Node.js

Este es un proyecto de frontend desarrollado en **React.js**, utilizando **Tailwind CSS** para estilos y consumiendo una API backend desarrollada en **Node.js**. La aplicación permite autenticarse, visualizar, crear, editar y eliminar usuarios, todo gestionado mediante un flujo con **React Router** y un sistema de autenticación basado en **tokens JWT**.

---

## 🚀 Características Principales

- 🔐 **Autenticación con login** (token JWT)
- 📦 **Consumo de API REST** (`http://localhost:4000`)
- 🧭 **Integración con React Router DOM**
- 👥 **Gestión de usuarios en un DataTable**
  - Listado de usuarios
  - Crear usuario (con modal popup)
  - Editar usuario
  - Eliminar usuario
- 🎨 **Diseño responsivo con Tailwind CSS**

---

## 🛠️ Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Node.js API](http://localhost:4000) (externa)
- [JWT](https://jwt.io/) para autenticación
- [Vite](https://vitejs.dev/) o similar para bundling (dependiendo de tu setup)

---

## 📁 Estructura del Proyecto

- **src/**
  - **assets/** – Recursos estáticos
    - images/
    - fonts/
    - styles/
      - styles.css
  - **components/** – Componentes UI reutilizables
    - **common/**
      - ModalPopup.jsx
    - **layouts/**
      - Sidebar.jsx
  - **features/** – Funcionalidades agrupadas por dominio
    - **auth/**
      - components/
      - hooks/
      - services/
      - index.js
    - **users/**
      - components/
      - hooks/
      - services/
      - index.js
  - **hooks/**
  - **lib/**
    - api/
    - utils/
      - helpers.js
      - validators.js
  - **pages/**
    - HomePage.jsx
    - Dashboard.jsx
  - **routes/**
    - PrivateRoute.jsx
    - AppRouter.jsx
  - index.jsx

## ⚙️ Instalación y Ejecución

1. **Clonar el repositorio:**

```bash
git clone https://github.com/tu-usuario/proyecto-crud-react.git
cd proyecto-crud-react
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar las variables de entorno en .env:**
```bash
REACT_APP_API_URL=http://localhost:4000
```

4. **Levantar el proyecto (modo desarrollo):**
```bash
npm start
```

## 🧪 Funcionalidades Detalladas

- **Login:** Formulario que envía las credenciales al backend y guarda el token JWT localmente.
- **Tabla de Usuarios:** Listado dinámico de usuarios obtenidos desde la API.
- **Crear Usuario:** Abre un modal tipo popup para registrar un nuevo usuario.
- **Editar Usuario:** Permite modificar los datos de un usuario desde la tabla usando un modal.
- **Eliminar Usuario:** Elimina un usuario directamente desde el DataTable.
- **Rutas Protegidas:** Acceso restringido a ciertas rutas si el usuario no está autenticado (basado en token).

## ✍️ Autor

Desarrollado por **Yesid Alejandro Sacaca Carrasco**



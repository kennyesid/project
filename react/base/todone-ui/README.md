
# Test React JS - Proyecto con Seguridad y CRUD

Este proyecto es una aplicación de React JS que incluye autenticación con JWT y un CRUD completo para usuarios. Está diseñado para consumir un backend basado en Node.js y MongoDB.

## **Características**
- Login con autenticación JWT.
- Protección de rutas mediante `RouterProvider`.
- CRUD completo para usuarios.
- Manejo de errores para rutas inexistentes.
- Estilo moderno con TailwindCSS.

---

## **Requisitos Previos**
- Node.js (versión 14 o superior).
- Yarn instalado globalmente.
- Backend corriendo con las siguientes rutas:
  - `POST /users/login` para autenticación.
  - `GET /users/all` para obtener usuarios (requiere token).
  - `PUT /users/:id` para editar usuarios (requiere token).
  - `DELETE /users/:id` para eliminar usuarios (requiere token).

---

## **Instalación**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/kennyesid/test-react.git
   cd test-react
   ```

2. Instala las dependencias:
   ```bash
   yarn install
   ```

3. Configura las variables del entorno si es necesario (ejemplo: URL del backend).

---

## **Ejecución del Proyecto**

1. Inicia el servidor de desarrollo:
   ```bash
   yarn start
   ```

2. Abre tu navegador y navega a [http://localhost:3000](http://localhost:3000).

3. Credenciales para entrar al sistema
	"email": "kennyesid@gmail.com"
	"password": "123456"
	

---

## **Rutas y Funcionalidades**

### **1. Login**
- **Endpoint del Backend**: `POST /users/login`
- **Funcionalidad**: Autentica al usuario y almacena el token JWT en `localStorage`.

### **2. Rutas Protegidas**
- Usa el componente `ProtectedRoute` para verificar el token antes de acceder a rutas privadas como el Dashboard.

### **3. CRUD de Usuarios**
- **Listar Usuarios**: `GET /users` (requiere token).
- **Editar Usuario**: `PUT /users/:id` (requiere token).
- **Eliminar Usuario**: `DELETE /users/:id` (requiere token).

## **Tecnologías Utilizadas**

- **React JS**: Framework principal para la UI.
- **React Router v6**: Manejo de rutas, incluyendo `RouterProvider`.
- **Axios**: Para el consumo de APIs.
- **TailwindCSS**: Estilo moderno y utilitario para la interfaz.
- **JWT**: Autenticación de usuario.

---
# 📄 Generador de Facturas

<div align="center">

![Angular](https://img.shields.io/badge/Angular-17.0-red?style=for-the-badge&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?style=for-the-badge&logo=prisma)

**Aplicación full-stack moderna para crear, gestionar y descargar facturas en formato PDF**

[Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [API](#-documentación-de-la-api) • [Contribuir](#-contribuir)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación de la API](#-documentación-de-la-api)
- [Scripts Disponibles](#-scripts-disponibles)
- [Seeder de Datos](#-seeder-de-datos)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**Generador de Facturas** es una aplicación web completa que permite a los usuarios crear facturas profesionales, guardarlas en una base de datos y descargarlas como archivos PDF. La aplicación incluye autenticación de usuarios, gestión de facturas con paginación y búsqueda, y generación de PDFs con diseño profesional.

### Características Principales

- ✅ **Creación de facturas** sin necesidad de registro (solo genera PDF)
- ✅ **Sistema de autenticación** con JWT y encriptación de contraseñas
- ✅ **Gestión de facturas** con paginación y búsqueda en tiempo real
- ✅ **Generación de PDFs** profesionales con PDFKit
- ✅ **Interfaz moderna** con Angular 17 y Tailwind CSS
- ✅ **API RESTful** con Express y Prisma ORM
- ✅ **Base de datos PostgreSQL** para almacenamiento persistente

---

## ✨ Características

### 🎨 Frontend
- **Interfaz intuitiva** con diseño responsive usando Tailwind CSS
- **Búsqueda en tiempo real** con debounce para filtrar facturas
- **Paginación** con navegación entre páginas
- **Formularios dinámicos** para agregar múltiples items a las facturas
- **Cálculo automático** de subtotales, impuestos y totales
- **Descarga directa** de PDFs generados

### ⚙️ Backend
- **API RESTful** bien estructurada y documentada
- **Autenticación JWT** con tokens seguros
- **Validación de datos** en todos los endpoints
- **Búsqueda avanzada** con filtros por número de factura y nombre de cliente
- **Paginación eficiente** en el servidor
- **Generación de PDFs** con diseño profesional

### 🗄️ Base de Datos
- **Esquema bien definido** con Prisma ORM
- **Relaciones** entre usuarios, facturas e items
- **Migraciones** versionadas y controladas
- **Seeder** para datos de prueba

---

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 17** - Framework frontend
- **TypeScript** - Lenguaje de programación
- **Tailwind CSS** - Framework de estilos
- **RxJS** - Programación reactiva
- **Angular Forms** - Manejo de formularios

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación con tokens
- **bcrypt** - Encriptación de contraseñas
- **PDFKit** - Generación de PDFs

### Herramientas de Desarrollo
- **Prisma Studio** - Interfaz visual para la base de datos
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad de CSS

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (versión 9 o superior)
- **PostgreSQL** (versión 15 o superior)
- **Git** (para clonar el repositorio)

### Verificar Instalaciones

```bash
node --version  # Debe ser >= 18.0.0
npm --version   # Debe ser >= 9.0.0
psql --version  # Debe ser >= 15.0.0
```

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/generador-facturas.git
cd generador-facturas
```

### 2. Configurar el Backend

```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env  # Si existe, o crear manualmente
```

Editar el archivo `.env` con tus credenciales:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/invoice_db?schema=public"
JWT_SECRET="tu-secret-key-super-segura-cambiar-en-produccion"
PORT=3000
```

### 3. Configurar la Base de Datos

```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Ejecutar las migraciones
npm run prisma:migrate

# (Opcional) Ejecutar el seeder para datos de prueba
npm run seed
```

### 4. Configurar el Frontend

```bash
# Navegar a la carpeta del frontend
cd ../frontend

# Instalar dependencias
npm install
```

---

## ⚙️ Configuración

### Variables de Entorno del Backend

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a PostgreSQL | `postgresql://user:pass@localhost:5432/invoice_db` |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | `mi-clave-super-secreta-123` |
| `PORT` | Puerto del servidor Express | `3000` |

### Configuración del Frontend

El frontend está configurado para conectarse al backend en `http://localhost:3000/api`. Si necesitas cambiar esta URL, edita el archivo:

```
frontend/src/app/services/invoice.service.ts
frontend/src/app/services/auth.service.ts
```

Y actualiza la constante `API_URL`.

---

## 🎮 Uso

### Iniciar el Backend

```bash
cd backend
npm run dev  # Modo desarrollo con watch
# o
npm start    # Modo producción
```

El servidor estará disponible en `http://localhost:3000`

### Iniciar el Frontend

```bash
cd frontend
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Credenciales de Prueba (si ejecutaste el seeder)

```
Email: test@example.com
Contraseña: password123
```

### Flujo de Uso

1. **Crear una cuenta** o iniciar sesión
2. **Crear una factura** completando el formulario:
   - Datos del emisor (opcional)
   - Datos del cliente (obligatorio)
   - Agregar items con descripción, cantidad, precio e impuestos
   - El sistema calcula automáticamente los totales
3. **Generar PDF** o **Guardar factura** (requiere autenticación)
4. **Ver facturas guardadas** en "Mis Facturas"
5. **Buscar facturas** por número o nombre de cliente
6. **Navegar entre páginas** si hay muchas facturas
7. **Descargar PDFs** de facturas guardadas

---

## 📁 Estructura del Proyecto

```
generador-facturas/
├── backend/
│   ├── controllers/          # Controladores de rutas
│   │   ├── authController.js
│   │   └── invoiceController.js
│   ├── middleware/           # Middlewares (autenticación, etc.)
│   │   └── auth.js
│   ├── routes/               # Definición de rutas
│   │   ├── auth.js
│   │   └── invoice.js
│   ├── services/             # Lógica de negocio
│   │   ├── authService.js
│   │   └── invoiceService.js
│   ├── prisma/               # Schema y migraciones de Prisma
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── seed.js               # Seeder de datos de prueba
│   ├── server.js             # Punto de entrada del servidor
│   └── package.json
│
└── frontend/
    └── src/
        ├── app/
        │   ├── components/   # Componentes de Angular
        │   │   ├── invoice-create/
        │   │   ├── invoice-list/
        │   │   ├── login/
        │   │   └── register/
        │   ├── guards/       # Guards de rutas
        │   │   └── auth.guard.ts
        │   ├── interceptors/ # Interceptores HTTP
        │   │   └── auth.interceptor.ts
        │   ├── services/     # Servicios (llamadas API)
        │   │   ├── auth.service.ts
        │   │   └── invoice.service.ts
        │   ├── app.component.ts
        │   └── app.routes.ts
        ├── index.html
        ├── main.ts
        └── styles.css
```

---

## 📚 Documentación de la API

### Base URL

```
http://localhost:3000/api
```

### Endpoints de Autenticación

#### `POST /auth/register`

Registra un nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "clx123...",
    "email": "usuario@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `POST /auth/login`

Inicia sesión con un usuario existente.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "clx123...",
    "email": "usuario@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Endpoints de Facturas

#### `POST /invoice/generate`

Genera un PDF de factura (público, no requiere autenticación).

**Request Body:**
```json
{
  "invoiceNumber": "INV-001",
  "emitterName": "Mi Empresa SL",
  "emitterCif": "B12345678",
  "emitterAddress": "Calle Principal 123",
  "emitterPhone": "+34 912 345 678",
  "emitterEmail": "info@miempresa.com",
  "emitterLogo": "https://example.com/logo.png",
  "clientName": "Cliente SA",
  "clientCif": "A87654321",
  "clientAddress": "Calle Cliente 456",
  "clientPhone": "+34 987 654 321",
  "clientEmail": "cliente@example.com",
  "date": "2024-01-15",
  "items": [
    {
      "description": "Servicio de consultoría",
      "quantity": 10,
      "unitPrice": 100,
      "tax": 21,
      "total": 1210
    }
  ],
  "notes": "Pago a 30 días"
}
```

**Response (200):**
- Content-Type: `application/pdf`
- Archivo PDF descargable

#### `POST /invoice/save`

Guarda una factura en la base de datos (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** (igual que `/invoice/generate`)

**Response (201):**
```json
{
  "id": "clx456...",
  "invoiceNumber": "INV-001",
  "clientName": "Cliente SA",
  "total": 1210,
  "createdAt": "2024-01-15T00:00:00.000Z",
  "items": [...]
}
```

#### `GET /invoice/my`

Obtiene todas las facturas del usuario autenticado (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "clx456...",
    "invoiceNumber": "INV-001",
    "clientName": "Cliente SA",
    "total": 1210,
    "date": "2024-01-15T00:00:00.000Z",
    "items": [...]
  }
]
```

#### `GET /invoice/invoices`

Obtiene facturas con paginación y búsqueda (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (opcional): Número de página (por defecto: 1)
- `limit` (opcional): Registros por página (por defecto: 10, máximo: 100)
- `search` (opcional): Texto para buscar en número de factura o nombre de cliente

**Ejemplo:**
```
GET /api/invoice/invoices?page=1&limit=10&search=INV
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx456...",
      "invoiceNumber": "INV-001",
      "clientName": "Cliente SA",
      "total": 1210,
      "date": "2024-01-15T00:00:00.000Z",
      "items": [...]
    }
  ],
  "total": 25,
  "page": 1,
  "totalPages": 3
}
```

---

## 📜 Scripts Disponibles

### Backend

```bash
# Desarrollo
npm run dev              # Inicia el servidor con watch mode

# Producción
npm start                # Inicia el servidor en modo producción

# Prisma
npm run prisma:generate  # Genera el cliente de Prisma
npm run prisma:migrate   # Ejecuta las migraciones
npm run prisma:studio    # Abre Prisma Studio (interfaz visual)

# Datos
npm run seed             # Ejecuta el seeder para crear datos de prueba
```

### Frontend

```bash
# Desarrollo
npm start                # Inicia el servidor de desarrollo (puerto 4200)

# Build
npm run build            # Compila la aplicación para producción
npm run watch            # Compila en modo watch

# Testing
npm test                 # Ejecuta las pruebas unitarias
```

---

## 🌱 Seeder de Datos

El proyecto incluye un seeder que crea datos de prueba para facilitar el desarrollo y las pruebas.

### Ejecutar el Seeder

```bash
cd backend
npm run seed
```

### ¿Qué crea el seeder?

- **1 usuario de prueba:**
  - Email: `test@example.com`
  - Contraseña: `password123`

- **25 facturas de ejemplo** con:
  - Números de factura únicos (INV-0001 a INV-0025)
  - Clientes aleatorios de una lista predefinida
  - Items variados con diferentes precios e impuestos
  - Fechas distribuidas en los últimos 6 meses

### Nota

⚠️ **El seeder elimina todos los datos existentes** antes de crear los nuevos. Úsalo solo en desarrollo o cuando quieras resetear la base de datos.

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Guía de Contribución

- Sigue las convenciones de código existentes
- Añade comentarios cuando sea necesario
- Actualiza la documentación si es necesario
- Prueba tus cambios antes de hacer commit

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**

- GitHub: [@adrirj10](https://github.com/adrirj10)

---

## 🙏 Agradecimientos

- [Angular](https://angular.io/) - Framework frontend
- [Express](https://expressjs.com/) - Framework backend
- [Prisma](https://www.prisma.io/) - ORM moderno
- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilos
- [PDFKit](https://pdfkit.org/) - Generación de PDFs

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella ⭐**

Hecho con ❤️ usando Angular y Node.js

</div>

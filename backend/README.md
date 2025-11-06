# Backend - Generador de Facturas

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
Crear archivo `.env` con:
```
DATABASE_URL="postgresql://user:password@localhost:5432/invoice_db?schema=public"
JWT_SECRET="tu-secret-key-cambiar-en-produccion"
PORT=3000
```

3. Configurar base de datos:
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Iniciar servidor:
```bash
npm run dev
```

## Estructura

- `controllers/` - Controladores de rutas
- `services/` - Lógica de negocio
- `routes/` - Definición de rutas
- `middleware/` - Middlewares (autenticación, etc.)
- `prisma/` - Schema y migraciones de Prisma



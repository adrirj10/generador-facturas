# Solución para el error de Prisma "column `existe` does not exist"

Este error indica que la base de datos no está sincronizada con el schema de Prisma.

## Solución

Ejecuta los siguientes comandos en orden:

```bash
cd backend

# 1. Generar el cliente de Prisma actualizado
npm run prisma:generate

# 2. Crear una nueva migración para sincronizar la base de datos
npm run prisma:migrate dev

# Si te pide un nombre para la migración, usa algo como: "fix_schema_sync"
```

Si el problema persiste, puedes resetear la base de datos (¡CUIDADO: esto eliminará todos los datos!):

```bash
# Solo si no tienes datos importantes
npm run prisma:migrate reset
```

Luego vuelve a ejecutar las migraciones:

```bash
npm run prisma:migrate dev
```



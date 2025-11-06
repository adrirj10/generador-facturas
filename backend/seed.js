import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const clientNames = [
  'Acme Corporation',
  'Tech Solutions SL',
  'Global Services SA',
  'Digital Innovations',
  'Business Partners',
  'Creative Agency',
  'Marketing Pro',
  'Software House',
  'Consulting Group',
  'Design Studio',
  'Web Development Co',
  'Cloud Services',
  'Data Analytics Inc',
  'Mobile Apps Ltd',
  'E-commerce Solutions'
];

const itemDescriptions = [
  'Desarrollo de aplicación web',
  'Consultoría técnica',
  'Diseño gráfico',
  'Servicios de hosting',
  'Mantenimiento mensual',
  'Desarrollo de API',
  'Diseño de base de datos',
  'Servicios de marketing digital',
  'Desarrollo móvil',
  'Auditoría de seguridad',
  'Capacitación técnica',
  'Soporte técnico',
  'Integración de sistemas',
  'Optimización SEO',
  'Análisis de datos'
];

async function main() {
  console.log('🌱 Iniciando seeder...');

  // Limpiar datos existentes (opcional - comentar si no quieres borrar)
  console.log('🧹 Limpiando datos existentes...');
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuario de prueba
  console.log('👤 Creando usuario de prueba...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword
    }
  });
  console.log(`✅ Usuario creado: ${user.email}`);

  // Crear facturas de prueba
  console.log('📄 Creando facturas de prueba...');
  const invoicesToCreate = 25; // Crear 25 facturas para probar la paginación

  for (let i = 1; i <= invoicesToCreate; i++) {
    const clientName = clientNames[Math.floor(Math.random() * clientNames.length)];
    const numItems = Math.floor(Math.random() * 5) + 1; // Entre 1 y 5 items
    
    const items = [];
    let subtotal = 0;

    for (let j = 0; j < numItems; j++) {
      const description = itemDescriptions[Math.floor(Math.random() * itemDescriptions.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;
      const unitPrice = Math.floor(Math.random() * 500) + 50;
      const tax = [0, 10, 21][Math.floor(Math.random() * 3)]; // 0%, 10% o 21%
      const itemSubtotal = quantity * unitPrice;
      const itemTaxAmount = (itemSubtotal * tax) / 100;
      const itemTotal = itemSubtotal + itemTaxAmount;

      items.push({
        description,
        quantity,
        unitPrice,
        tax,
        total: itemTotal
      });

      subtotal += itemSubtotal;
    }

    const totalTaxAmount = items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      return sum + (itemSubtotal * item.tax) / 100;
    }, 0);

    const total = subtotal + totalTaxAmount;

    // Crear fecha aleatoria en los últimos 6 meses
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
    date.setDate(Math.floor(Math.random() * 28) + 1);

    await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${String(i).padStart(4, '0')}`,
        emitterName: 'Mi Empresa SL',
        emitterCif: 'B12345678',
        emitterAddress: 'Calle Principal 123, Madrid',
        emitterPhone: '+34 912 345 678',
        emitterEmail: 'info@miempresa.com',
        clientName,
        clientCif: `A${Math.floor(Math.random() * 90000000) + 10000000}`,
        clientAddress: `Calle ${Math.floor(Math.random() * 100) + 1}, Madrid`,
        clientPhone: `+34 9${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
        clientEmail: `cliente${i}@example.com`,
        date,
        subtotal,
        tax: totalTaxAmount,
        total,
        notes: i % 3 === 0 ? 'Pago a 30 días' : null,
        userId: user.id,
        items: {
          create: items
        }
      }
    });

    if (i % 5 === 0) {
      console.log(`  ✅ ${i} facturas creadas...`);
    }
  }

  console.log(`✅ ${invoicesToCreate} facturas creadas exitosamente`);
  console.log('🎉 Seeder completado!');
  console.log('\n📝 Credenciales de prueba:');
  console.log('   Email: test@example.com');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


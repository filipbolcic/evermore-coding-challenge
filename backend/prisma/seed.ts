import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: DATABASE_URL }),
});

const seedEvents = [
  {
    title: 'Client Call',
    startUtc: new Date('2026-04-01T09:00:00.000Z'),
    endUtc: new Date('2026-04-01T10:00:00.000Z'),
  },
  {
    title: 'Team Meeting',
    startUtc: new Date('2026-04-03T10:00:00.000Z'),
    endUtc: new Date('2026-04-03T11:00:00.000Z'),
  },
  {
    title: 'Project Review',
    startUtc: new Date('2026-04-04T14:00:00.000Z'),
    endUtc: new Date('2026-04-04T16:00:00.000Z'),
  },
  {
    title: 'Late Night Sync',
    startUtc: new Date('2026-04-05T23:00:00.000Z'),
    endUtc: new Date('2026-04-06T00:00:00.000Z'),
  },
  {
    title: 'Workshop',
    startUtc: new Date('2026-04-10T13:00:00.000Z'),
    endUtc: new Date('2026-04-10T17:00:00.000Z'),
  },
];

async function main() {
  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: seedEvents,
  });

  console.log(`Seeded ${seedEvents.length} events`);
}

main()
  .catch((error: unknown) => {
    console.error('Database seeding failed');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

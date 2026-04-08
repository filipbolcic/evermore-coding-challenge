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

function createUtcDateForLocalDay(
  anchor: Date,
  dayOffset: number,
  hour: number,
  minute: number,
) {
  return new Date(
    Date.UTC(
      anchor.getFullYear(),
      anchor.getMonth(),
      anchor.getDate() + dayOffset,
      hour,
      minute,
      0,
      0,
    ),
  );
}

function buildSeedEvents(anchor: Date) {
  return [
    {
      title: 'Morning Standup',
      startUtc: createUtcDateForLocalDay(anchor, -2, 9, 0),
      endUtc: createUtcDateForLocalDay(anchor, -2, 10, 0),
    },
    {
      title: 'Quarter Past Planning',
      startUtc: createUtcDateForLocalDay(anchor, -2, 10, 15),
      endUtc: createUtcDateForLocalDay(anchor, -2, 11, 15),
    },
    {
      title: 'Lunch Pairing Session',
      startUtc: createUtcDateForLocalDay(anchor, -1, 12, 30),
      endUtc: createUtcDateForLocalDay(anchor, -1, 13, 30),
    },
    {
      title: 'Midnight Boundary Sync',
      startUtc: createUtcDateForLocalDay(anchor, -1, 23, 30),
      endUtc: createUtcDateForLocalDay(anchor, 0, 0, 30),
    },
    {
      title: 'On The Hour Check-In',
      startUtc: createUtcDateForLocalDay(anchor, 0, 8, 0),
      endUtc: createUtcDateForLocalDay(anchor, 0, 9, 0),
    },
    {
      title: 'Back To Back Handoff',
      startUtc: createUtcDateForLocalDay(anchor, 0, 9, 0),
      endUtc: createUtcDateForLocalDay(anchor, 0, 10, 0),
    },
    {
      title: 'Half Hour Design Review',
      startUtc: createUtcDateForLocalDay(anchor, 0, 10, 30),
      endUtc: createUtcDateForLocalDay(anchor, 0, 11, 30),
    },
    {
      title: 'Current Window Deep Work',
      startUtc: createUtcDateForLocalDay(
        anchor,
        0,
        14,
        anchor.getMinutes() < 30 ? 0 : 30,
      ),
      endUtc: createUtcDateForLocalDay(
        anchor,
        0,
        15,
        anchor.getMinutes() < 30 ? 0 : 30,
      ),
    },
    {
      title: 'Late Evening Release Watch',
      startUtc: createUtcDateForLocalDay(anchor, 1, 22, 45),
      endUtc: createUtcDateForLocalDay(anchor, 1, 23, 45),
    },
    {
      title: 'Overnight Support Rotation',
      startUtc: createUtcDateForLocalDay(anchor, 1, 23, 45),
      endUtc: createUtcDateForLocalDay(anchor, 2, 1, 15),
    },
    {
      title: 'Multi-Day Offsite',
      startUtc: createUtcDateForLocalDay(anchor, 2, 15, 0),
      endUtc: createUtcDateForLocalDay(anchor, 4, 11, 0),
    },
    {
      title: 'Friday Retro',
      startUtc: createUtcDateForLocalDay(anchor, 4, 16, 30),
      endUtc: createUtcDateForLocalDay(anchor, 4, 17, 30),
    },
  ];
}

async function main() {
  const anchor = new Date();
  const seedEvents = buildSeedEvents(anchor);

  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: seedEvents,
  });

  console.log(
    `Seeded ${seedEvents.length} events around ${anchor.toISOString()}`,
  );
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

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { EventsService } from './../src/events/events.service';
import { PrismaService } from './../src/prisma/prisma.service';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const request = require('supertest');

describe('EventsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(EventsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({
          id: 'event-1',
          title: 'Client Call',
          startUtc: '2026-04-01T09:00:00.000Z',
          endUtc: '2026-04-01T10:00:00.000Z',
        }),
        update: jest.fn().mockResolvedValue({
          id: 'event-1',
          title: 'Updated Call',
          startUtc: '2026-04-01T11:00:00.000Z',
          endUtc: '2026-04-01T12:00:00.000Z',
        }),
        remove: jest.fn().mockResolvedValue(undefined),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/events (GET)', () => {
    return request(app.getHttpServer()).get('/events').expect(200).expect([]);
  });

  it('/events (POST)', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        title: 'Client Call',
        startUtc: '2026-04-01T09:00:00.000Z',
        endUtc: '2026-04-01T10:00:00.000Z',
      })
      .expect(201)
      .expect({
        id: 'event-1',
        title: 'Client Call',
        startUtc: '2026-04-01T09:00:00.000Z',
        endUtc: '2026-04-01T10:00:00.000Z',
      });
  });

  it('/events/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/events/event-1')
      .send({
        title: 'Updated Call',
      })
      .expect(200)
      .expect({
        id: 'event-1',
        title: 'Updated Call',
        startUtc: '2026-04-01T11:00:00.000Z',
        endUtc: '2026-04-01T12:00:00.000Z',
      });
  });

  it('/events/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/events/event-1').expect(204);
  });

  it('/events (POST) rejects datetimes without timezone information', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        title: 'Client Call',
        startUtc: '2026-04-01T09:00:00.000',
        endUtc: '2026-04-01T10:00:00.000',
      })
      .expect(400);
  });

  it('/events (POST) rejects datetimes with non-UTC offsets', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        title: 'Client Call',
        startUtc: '2026-04-01T11:00:00.000+02:00',
        endUtc: '2026-04-01T12:00:00.000+02:00',
      })
      .expect(400);
  });
});

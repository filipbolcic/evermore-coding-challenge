import { INestApplication } from '@nestjs/common';
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
      })
      .compile();

    app = moduleFixture.createNestApplication();
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
});

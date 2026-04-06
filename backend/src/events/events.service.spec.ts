import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let prismaService: {
    event: {
      findMany: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaService = {
      event: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    eventsService = moduleRef.get<EventsService>(EventsService);
  });

  describe('findAll', () => {
    it('returns events sorted by start time and maps dates to ISO strings', async () => {
      prismaService.event.findMany.mockResolvedValue([
        {
          id: 'event-1',
          title: 'Client Call',
          startUtc: new Date('2026-04-01T09:00:00.000Z'),
          endUtc: new Date('2026-04-01T10:00:00.000Z'),
        },
      ]);

      await expect(eventsService.findAll()).resolves.toEqual([
        {
          id: 'event-1',
          title: 'Client Call',
          startUtc: '2026-04-01T09:00:00.000Z',
          endUtc: '2026-04-01T10:00:00.000Z',
        },
      ]);

      expect(prismaService.event.findMany).toHaveBeenCalledWith({
        orderBy: {
          startUtc: 'asc',
        },
      });
    });
  });

  describe('create', () => {
    it('creates an event with a trimmed title and returns ISO strings', async () => {
      prismaService.event.create.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });

      await expect(
        eventsService.create({
          title: '  Client Call  ',
          startUtc: '2026-04-01T09:00:00.000Z',
          endUtc: '2026-04-01T10:00:00.000Z',
        }),
      ).resolves.toEqual({
        id: 'event-1',
        title: 'Client Call',
        startUtc: '2026-04-01T09:00:00.000Z',
        endUtc: '2026-04-01T10:00:00.000Z',
      });

      expect(prismaService.event.create).toHaveBeenCalledWith({
        data: {
          title: 'Client Call',
          startUtc: new Date('2026-04-01T09:00:00.000Z'),
          endUtc: new Date('2026-04-01T10:00:00.000Z'),
        },
      });
    });

    it('rejects events whose end time is before or equal to the start time', async () => {
      await expect(
        eventsService.create({
          title: 'Broken Event',
          startUtc: '2026-04-01T10:00:00.000Z',
          endUtc: '2026-04-01T10:00:00.000Z',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaService.event.create).not.toHaveBeenCalled();
    });
  });
});

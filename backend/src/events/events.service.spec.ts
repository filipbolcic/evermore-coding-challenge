import { BadRequestException } from '@nestjs/common';
import { UTCDate } from '@date-fns/utc';
import { Prisma } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let prismaService: {
    event: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaService = {
      event: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
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
      expect(prismaService.event.findFirst).toHaveBeenCalledWith({
        where: {
          id: undefined,
          startUtc: {
            lt: new UTCDate('2026-04-01T10:00:00.000Z'),
          },
          endUtc: {
            gt: new UTCDate('2026-04-01T09:00:00.000Z'),
          },
        },
        select: {
          id: true,
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

    it('rejects datetimes that are not explicitly UTC', async () => {
      await expect(
        eventsService.create({
          title: 'Broken Event',
          startUtc: '2026-04-01T11:00:00.000+02:00',
          endUtc: '2026-04-01T12:00:00.000+02:00',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaService.event.create).not.toHaveBeenCalled();
    });

    it('accepts zero-offset UTC datetimes with an explicit +00:00 suffix', async () => {
      prismaService.event.create.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });

      await eventsService.create({
        title: 'Client Call',
        startUtc: '2026-04-01T09:00:00.000+00:00',
        endUtc: '2026-04-01T10:00:00.000+00:00',
      });

      const createArgs = prismaService.event.create.mock.calls[0][0];
      expect(createArgs.data.startUtc.toISOString()).toBe('2026-04-01T09:00:00.000Z');
      expect(createArgs.data.endUtc.toISOString()).toBe('2026-04-01T10:00:00.000Z');
    });

    it('rejects invalid datetimes', async () => {
      await expect(
        eventsService.create({
          title: 'Broken Event',
          startUtc: 'not-a-date',
          endUtc: '2026-04-01T10:00:00.000Z',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaService.event.create).not.toHaveBeenCalled();
    });

    it('persists UTCDate instances after parsing', async () => {
      prismaService.event.create.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });

      await eventsService.create({
        title: 'Client Call',
        startUtc: '2026-04-01T09:00:00.000Z',
        endUtc: '2026-04-01T10:00:00.000Z',
      });

      const createArgs = prismaService.event.create.mock.calls[0][0];
      expect(createArgs.data.startUtc).toBeInstanceOf(UTCDate);
      expect(createArgs.data.endUtc).toBeInstanceOf(UTCDate);
      expect(createArgs.data.startUtc.toISOString()).toBe('2026-04-01T09:00:00.000Z');
      expect(createArgs.data.endUtc.toISOString()).toBe('2026-04-01T10:00:00.000Z');
    });

    it('rejects creation when the UTC range overlaps an existing event', async () => {
      prismaService.event.findFirst.mockResolvedValue({
        id: 'event-2',
      });

      await expect(
        eventsService.create({
          title: 'Overlapping Event',
          startUtc: '2026-04-01T09:30:00.000Z',
          endUtc: '2026-04-01T10:30:00.000Z',
        }),
      ).rejects.toThrow('Event overlaps with an existing event');

      expect(prismaService.event.create).not.toHaveBeenCalled();
    });

    it('allows creation when a new event starts exactly when another ends', async () => {
      prismaService.event.findFirst.mockResolvedValue(null);
      prismaService.event.create.mockResolvedValue({
        id: 'event-2',
        title: 'Follow-up Call',
        startUtc: new Date('2026-04-01T10:00:00.000Z'),
        endUtc: new Date('2026-04-01T11:00:00.000Z'),
      });

      await expect(
        eventsService.create({
          title: 'Follow-up Call',
          startUtc: '2026-04-01T10:00:00.000Z',
          endUtc: '2026-04-01T11:00:00.000Z',
        }),
      ).resolves.toEqual({
        id: 'event-2',
        title: 'Follow-up Call',
        startUtc: '2026-04-01T10:00:00.000Z',
        endUtc: '2026-04-01T11:00:00.000Z',
      });
    });
  });

  describe('update', () => {
    it('updates an event and preserves existing times when they are not provided', async () => {
      prismaService.event.findUnique.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });
      prismaService.event.update.mockResolvedValue({
        id: 'event-1',
        title: 'Updated Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });

      await expect(
        eventsService.update('event-1', {
          title: '  Updated Call  ',
        }),
      ).resolves.toEqual({
        id: 'event-1',
        title: 'Updated Call',
        startUtc: '2026-04-01T09:00:00.000Z',
        endUtc: '2026-04-01T10:00:00.000Z',
      });

      expect(prismaService.event.update).toHaveBeenCalledWith({
        where: { id: 'event-1' },
        data: {
          title: 'Updated Call',
          startUtc: new Date('2026-04-01T09:00:00.000Z'),
          endUtc: new Date('2026-04-01T10:00:00.000Z'),
        },
      });
      expect(prismaService.event.findFirst).toHaveBeenCalledWith({
        where: {
          id: { not: 'event-1' },
          startUtc: {
            lt: new UTCDate('2026-04-01T10:00:00.000Z'),
          },
          endUtc: {
            gt: new UTCDate('2026-04-01T09:00:00.000Z'),
          },
        },
        select: {
          id: true,
        },
      });
    });

    it('rejects invalid updated time ranges', async () => {
      prismaService.event.findUnique.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });

      await expect(
        eventsService.update('event-1', {
          endUtc: '2026-04-01T08:00:00.000Z',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaService.event.update).not.toHaveBeenCalled();
    });

    it('rejects updated datetimes that are not explicitly UTC', async () => {
      prismaService.event.findUnique.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });
      await expect(
        eventsService.update('event-1', {
          startUtc: '2026-04-01T08:00:00.000-04:00',
          endUtc: '2026-04-01T09:00:00.000-04:00',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaService.event.update).not.toHaveBeenCalled();
    });

    it('accepts zero-offset UTC datetimes with an explicit +00:00 suffix during update', async () => {
      prismaService.event.findUnique.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });
      prismaService.event.update.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:30:00.000Z'),
        endUtc: new Date('2026-04-01T10:30:00.000Z'),
      });

      await eventsService.update('event-1', {
        startUtc: '2026-04-01T09:30:00.000+00:00',
        endUtc: '2026-04-01T10:30:00.000+00:00',
      });

      const updateArgs = prismaService.event.update.mock.calls[0][0];
      expect(updateArgs.data.startUtc.toISOString()).toBe('2026-04-01T09:30:00.000Z');
      expect(updateArgs.data.endUtc.toISOString()).toBe('2026-04-01T10:30:00.000Z');
    });

    it('uses UTCDate instances for persisted and updated datetimes during validation', async () => {
      prismaService.event.findUnique.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });
      prismaService.event.update.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:30:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });

      await eventsService.update('event-1', {
        startUtc: '2026-04-01T09:30:00.000Z',
      });

      const updateArgs = prismaService.event.update.mock.calls[0][0];
      expect(updateArgs.data.startUtc).toBeInstanceOf(UTCDate);
      expect(updateArgs.data.endUtc).toBeInstanceOf(UTCDate);
      expect(updateArgs.data.startUtc.toISOString()).toBe('2026-04-01T09:30:00.000Z');
      expect(updateArgs.data.endUtc.toISOString()).toBe('2026-04-01T10:00:00.000Z');
    });

    it('rejects updates when the UTC range overlaps another event', async () => {
      prismaService.event.findUnique.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });
      prismaService.event.findFirst.mockResolvedValue({
        id: 'event-2',
      });

      await expect(
        eventsService.update('event-1', {
          startUtc: '2026-04-01T09:30:00.000Z',
          endUtc: '2026-04-01T10:30:00.000Z',
        }),
      ).rejects.toThrow('Event overlaps with an existing event');

      expect(prismaService.event.update).not.toHaveBeenCalled();
    });

    it('allows updates when the UTC range only touches another event boundary', async () => {
      prismaService.event.findUnique.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T09:00:00.000Z'),
        endUtc: new Date('2026-04-01T10:00:00.000Z'),
      });
      prismaService.event.findFirst.mockResolvedValue(null);
      prismaService.event.update.mockResolvedValue({
        id: 'event-1',
        title: 'Client Call',
        startUtc: new Date('2026-04-01T10:00:00.000Z'),
        endUtc: new Date('2026-04-01T11:00:00.000Z'),
      });

      await expect(
        eventsService.update('event-1', {
          startUtc: '2026-04-01T10:00:00.000Z',
          endUtc: '2026-04-01T11:00:00.000Z',
        }),
      ).resolves.toEqual({
        id: 'event-1',
        title: 'Client Call',
        startUtc: '2026-04-01T10:00:00.000Z',
        endUtc: '2026-04-01T11:00:00.000Z',
      });
    });
  });

  describe('remove', () => {
    it('deletes an event by id', async () => {
      prismaService.event.delete.mockResolvedValue({
        id: 'event-1',
      });

      await expect(eventsService.remove('event-1')).resolves.toBeUndefined();

      expect(prismaService.event.delete).toHaveBeenCalledWith({
        where: { id: 'event-1' },
      });
    });

    it('throws when deleting a missing event', async () => {
      prismaService.event.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: '7.6.0',
        }),
      );

      await expect(eventsService.remove('missing-event')).rejects.toThrow(
        'Event missing-event not found',
      );
    });
  });
});

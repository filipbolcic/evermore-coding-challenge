import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let prismaService: {
    event: {
      findMany: jest.Mock;
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

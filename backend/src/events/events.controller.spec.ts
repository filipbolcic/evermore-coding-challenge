import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: {
    findAll: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    eventsService = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 'event-1',
          title: 'Client Call',
          startUtc: '2026-04-01T09:00:00.000Z',
          endUtc: '2026-04-01T10:00:00.000Z',
        },
      ]),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: eventsService,
        },
      ],
    }).compile();

    eventsController = moduleRef.get<EventsController>(EventsController);
  });

  describe('findAll', () => {
    it('returns the list of events from the service', async () => {
      await expect(eventsController.findAll()).resolves.toEqual([
        {
          id: 'event-1',
          title: 'Client Call',
          startUtc: '2026-04-01T09:00:00.000Z',
          endUtc: '2026-04-01T10:00:00.000Z',
        },
      ]);

      expect(eventsService.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('delegates updates to the service', async () => {
      eventsService.update.mockResolvedValue({
        id: 'event-1',
        title: 'Updated Call',
        startUtc: '2026-04-01T11:00:00.000Z',
        endUtc: '2026-04-01T12:00:00.000Z',
      });

      await expect(
        eventsController.update('event-1', {
          title: 'Updated Call',
        }),
      ).resolves.toEqual({
        id: 'event-1',
        title: 'Updated Call',
        startUtc: '2026-04-01T11:00:00.000Z',
        endUtc: '2026-04-01T12:00:00.000Z',
      });

      expect(eventsService.update).toHaveBeenCalledWith('event-1', {
        title: 'Updated Call',
      });
    });
  });

  describe('remove', () => {
    it('delegates deletes to the service', async () => {
      eventsService.remove.mockResolvedValue(undefined);

      await expect(eventsController.remove('event-1')).resolves.toBeUndefined();

      expect(eventsService.remove).toHaveBeenCalledWith('event-1');
    });
  });
});

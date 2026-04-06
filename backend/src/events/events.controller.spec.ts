import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let eventsController: EventsController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    eventsController = moduleRef.get<EventsController>(EventsController);
  });

  describe('findAll', () => {
    it('returns the list of events from the service', async () => {
      await expect(eventsController.findAll()).resolves.toEqual([]);
    });
  });
});

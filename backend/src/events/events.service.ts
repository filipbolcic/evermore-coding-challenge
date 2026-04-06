import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const events = await this.prisma.event.findMany({
      orderBy: {
        startUtc: 'asc',
      },
    });

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      startUtc: event.startUtc.toISOString(),
      endUtc: event.endUtc.toISOString(),
    }));
  }

  async create(createEventDto: CreateEventDto) {
    const startUtc = new Date(createEventDto.startUtc);
    const endUtc = new Date(createEventDto.endUtc);

    if (endUtc <= startUtc) {
      throw new BadRequestException('endUtc must be after startUtc');
    }

    const event = await this.prisma.event.create({
      data: {
        title: createEventDto.title.trim(),
        startUtc,
        endUtc,
      },
    });

    return {
      id: event.id,
      title: event.title,
      startUtc: event.startUtc.toISOString(),
      endUtc: event.endUtc.toISOString(),
    };
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { parseEventDateTime } from './date-time.util';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

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
    const startUtc = parseEventDateTime(createEventDto.startUtc, 'startUtc');
    const endUtc = parseEventDateTime(createEventDto.endUtc, 'endUtc');

    this.validateTimeRange(startUtc, endUtc);

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

  async update(id: string, updateEventDto: UpdateEventDto) {
    const existingEvent = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    const startUtc = updateEventDto.startUtc
      ? parseEventDateTime(updateEventDto.startUtc, 'startUtc')
      : existingEvent.startUtc;
    const endUtc = updateEventDto.endUtc
      ? parseEventDateTime(updateEventDto.endUtc, 'endUtc')
      : existingEvent.endUtc;

    this.validateTimeRange(startUtc, endUtc);

    const event = await this.prisma.event.update({
      where: { id },
      data: {
        title: updateEventDto.title?.trim(),
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

  async remove(id: string) {
    try {
      await this.prisma.event.delete({
        where: { id },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Event ${id} not found`);
      }

      throw error;
    }
  }

  private validateTimeRange(startUtc: Date, endUtc: Date) {
    if (endUtc <= startUtc) {
      throw new BadRequestException('endUtc must be after startUtc');
    }
  }
}

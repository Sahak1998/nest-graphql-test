import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Between } from 'typeorm';
import { Event } from '../../domain/entities/event.entity';
import { IEventRepository } from '../../domain/repositories/event.repository.interface';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  async findById(id: string): Promise<Event | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['fights', 'fights.fighter1', 'fights.fighter2'],
    });
  }

  async findAll(): Promise<Event[]> {
    return this.repository.find({
      relations: ['fights', 'fights.fighter1', 'fights.fighter2'],
    });
  }

  async create(event: Partial<Event>): Promise<Event> {
    const newEvent = this.repository.create(event);
    return this.repository.save(newEvent);
  }

  async update(id: string, event: Partial<Event>): Promise<Event | null> {
    await this.repository.update(id, event);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findUpcoming(): Promise<Event[]> {
    return this.repository.find({
      where: {
        date: MoreThan(new Date()),
        isCompleted: false,
      },
      relations: ['fights', 'fights.fighter1', 'fights.fighter2'],
      order: { date: 'ASC' },
    });
  }

  async findPast(): Promise<Event[]> {
    return this.repository.find({
      where: {
        date: LessThan(new Date()),
        isCompleted: true,
      },
      relations: ['fights', 'fights.fighter1', 'fights.fighter2'],
      order: { date: 'DESC' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return this.repository.find({
      where: {
        date: Between(startDate, endDate),
      },
      relations: ['fights', 'fights.fighter1', 'fights.fighter2'],
      order: { date: 'ASC' },
    });
  }

  async markAsCompleted(id: string): Promise<Event | null> {
    await this.repository.update(id, { isCompleted: true });
    return this.findById(id);
  }
} 
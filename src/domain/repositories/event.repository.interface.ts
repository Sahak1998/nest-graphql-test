import { Event } from '../entities/event.entity';

export const EVENT_REPOSITORY = 'EVENT_REPOSITORY';

export interface IEventRepository {
  findById(id: string): Promise<Event | null>;
  findAll(): Promise<Event[]>;
  create(event: Partial<Event>): Promise<Event>;
  update(id: string, event: Partial<Event>): Promise<Event | null>;
  delete(id: string): Promise<void>;
  findUpcoming(): Promise<Event[]>;
  findPast(): Promise<Event[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Event[]>;
  markAsCompleted(id: string): Promise<Event | null>;
} 
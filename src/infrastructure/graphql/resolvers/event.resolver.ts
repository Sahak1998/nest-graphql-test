import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Event } from '../types/event.type';
import { IEventRepository } from '../../../domain/repositories/event.repository.interface';
import { Inject } from '@nestjs/common';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface';
import { Event as EventEntity } from '../../../domain/entities/event.entity';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  @Query(() => Event, { nullable: true })
  async event(@Args('id', { type: () => ID }) id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  @Query(() => [Event])
  async upcomingEvents(): Promise<Event[]> {
    return this.eventRepository.findUpcoming();
  }

  @Query(() => [Event])
  async pastEvents(): Promise<Event[]> {
    return this.eventRepository.findPast();
  }

  @Query(() => [Event])
  async eventsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<Event[]> {
    return this.eventRepository.findByDateRange(startDate, endDate);
  }

  @Mutation(() => Event)
  async createEvent(
    @Args('name') name: string,
    @Args('date') date: Date,
    @Args('location') location: string,
    @Args('venue', { nullable: true }) venue?: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Event> {
    return this.eventRepository.create({
      name,
      date,
      location,
      venue,
      description,
      isCompleted: false,
    });
  }

  @Mutation(() => Event, { nullable: true })
  async updateEvent(
    @Args('id', { type: () => ID }) id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('date', { nullable: true }) date?: Date,
    @Args('location', { nullable: true }) location?: string,
    @Args('venue', { nullable: true }) venue?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('isCompleted', { nullable: true }) isCompleted?: boolean,
  ): Promise<Event | null> {
    return this.eventRepository.update(id, {
      name,
      date,
      location,
      venue,
      description,
      isCompleted,
    });
  }

  @Mutation(() => Event, { nullable: true })
  async markEventAsCompleted(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Event | null> {
    return this.eventRepository.markAsCompleted(id);
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    await this.eventRepository.delete(id);
    return true;
  }
} 
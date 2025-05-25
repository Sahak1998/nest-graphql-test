import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Fight } from '../types/fight.type';
import { IFightRepository } from '../../../domain/repositories/fight.repository.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { Event } from '../types/event.type';
import { Fighter } from '../types/fighter.type';
import { Inject } from '@nestjs/common';
import { FIGHT_REPOSITORY } from '../../../domain/repositories/fight.repository.interface';
import { Fight as FightEntity, FightResult } from '../../../domain/entities/fight.entity';
import { Event as EventEntity } from '../../../domain/entities/event.entity';
import { Fighter as FighterEntity } from '../../../domain/entities/fighter.entity';

@Resolver(() => Fight)
export class FightResolver {
  constructor(
    @Inject(FIGHT_REPOSITORY)
    private readonly fightRepository: IFightRepository,
    @InjectQueue('ranking') private readonly rankingQueue: Queue,
  ) {}

  @Query(() => Fight, { nullable: true })
  async fight(@Args('id', { type: () => ID }) id: string): Promise<Fight | null> {
    return this.fightRepository.findById(id);
  }

  @Query(() => [Fight])
  async fights(): Promise<Fight[]> {
    return this.fightRepository.findAll();
  }

  @Query(() => [Fight])
  async fightsByEvent(
    @Args('eventId', { type: () => ID }) eventId: string,
  ): Promise<Fight[]> {
    return this.fightRepository.findByEvent(eventId);
  }

  @Query(() => [Fight])
  async fightsByFighter(
    @Args('fighterId', { type: () => ID }) fighterId: string,
  ): Promise<Fight[]> {
    return this.fightRepository.findByFighter(fighterId);
  }

  @Mutation(() => Fight)
  async createFight(
    @Args('eventId', { type: () => ID }) eventId: string,
    @Args('fighter1Id', { type: () => ID }) fighter1Id: string,
    @Args('fighter2Id', { type: () => ID }) fighter2Id: string,
    @Args('round', { type: () => Int }) round: number,
    @Args('isTitleFight', { type: () => Boolean, defaultValue: false }) isTitleFight: boolean,
  ): Promise<Fight> {
    return this.fightRepository.create({
      event: { id: eventId } as EventEntity,
      fighter1: { id: fighter1Id } as FighterEntity,
      fighter2: { id: fighter2Id } as FighterEntity,
      round,
      isTitleFight,
      isCompleted: false,
    });
  }

  @Mutation(() => Fight, { nullable: true })
  async updateFight(
    @Args('id', { type: () => ID }) id: string,
    @Args('eventId', { type: () => ID, nullable: true }) eventId?: string,
    @Args('fighter1Id', { type: () => ID, nullable: true }) fighter1Id?: string,
    @Args('fighter2Id', { type: () => ID, nullable: true }) fighter2Id?: string,
    @Args('round', { type: () => Int, nullable: true }) round?: number,
    @Args('isTitleFight', { type: () => Boolean, nullable: true }) isTitleFight?: boolean,
  ): Promise<Fight | null> {
    return this.fightRepository.update(id, {
      event: eventId ? { id: eventId } as EventEntity : undefined,
      fighter1: fighter1Id ? { id: fighter1Id } as FighterEntity : undefined,
      fighter2: fighter2Id ? { id: fighter2Id } as FighterEntity : undefined,
      round,
      isTitleFight,
    });
  }

  @Mutation(() => Fight, { nullable: true })
  async markFightAsCompleted(
    @Args('id', { type: () => ID }) id: string,
    @Args('winnerId', { type: () => ID }) winnerId: string,
    @Args('loserId', { type: () => ID }) loserId: string,
    @Args('result', { type: () => String }) result: FightResult,
    @Args('round', { type: () => Int }) round: number,
    @Args('time') time: string,
  ): Promise<Fight | null> {
    const fight = await this.fightRepository.markAsCompleted(id, winnerId, result, round, time);
    await this.rankingQueue.add('ranking', { winnerId, loserId, result });
    return fight;
  }

  @Mutation(() => Boolean)
  async deleteFight(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    await this.fightRepository.delete(id);
    return true;
  }
} 
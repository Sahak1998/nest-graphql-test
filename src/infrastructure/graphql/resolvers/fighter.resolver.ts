import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Fighter } from '../types/fighter.type';
import { IFighterRepository } from '../../../domain/repositories/fighter.repository.interface';
import { RankingService } from '../../../application/services/ranking.service';
import { WeightClass } from '../types/weight-class.type';
import { Inject } from '@nestjs/common';
import { FIGHTER_REPOSITORY } from '../../../domain/repositories/fighter.repository.interface';
import { Fighter as FighterEntity } from '../../../domain/entities/fighter.entity';
import { WeightClass as WeightClassEntity } from '../../../domain/entities/weight-class.entity';

@Resolver(() => Fighter)
export class FighterResolver {
  constructor(
    @Inject(FIGHTER_REPOSITORY)
    private readonly fighterRepository: IFighterRepository,
    private readonly rankingService: RankingService,
  ) {}

  @Query(() => Fighter, { nullable: true })
  async fighter(@Args('id', { type: () => ID }) id: string): Promise<Fighter | null> {
    return this.fighterRepository.findById(id);
  }

  @Query(() => [Fighter])
  async fighters(): Promise<Fighter[]> {
    return this.fighterRepository.findAll();
  }

  @Query(() => [Fighter])
  async fightersByWeightClass(
    @Args('weightClassId', { type: () => ID }) weightClassId: string,
  ): Promise<Fighter[]> {
    return this.fighterRepository.findByWeightClass(weightClassId);
  }

  @Query(() => [Fighter])
  async rankingsByWeightClass(
    @Args('weightClassId', { type: () => ID }) weightClassId: string,
  ): Promise<Fighter[]> {
    return this.rankingService.getRankingsByWeightClass(weightClassId);
  }

  @Mutation(() => Fighter)
  async createFighter(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('weightClassId', { type: () => ID }) weightClassId: string,
    @Args('nickname', { nullable: true }) nickname?: string,
    @Args('dateOfBirth', { nullable: true }) dateOfBirth?: Date,
    @Args('nationality', { nullable: true }) nationality?: string,
    @Args('height', { nullable: true }) height?: string,
    @Args('weight', { nullable: true }) weight?: number,
    @Args('reach', { nullable: true }) reach?: string,
    @Args('stance', { nullable: true }) stance?: string,
  ): Promise<Fighter> {
    return this.fighterRepository.create({
      firstName,
      lastName,
      weightClass: { id: weightClassId } as WeightClassEntity,
      nickname,
      dateOfBirth,
      nationality,
      height,
      weight,
      reach,
      stance,
    });
  }

  @Mutation(() => Fighter, { nullable: true })
  async updateFighter(
    @Args('id', { type: () => ID }) id: string,
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
    @Args('weightClassId', { type: () => ID, nullable: true }) weightClassId?: string,
    @Args('nickname', { nullable: true }) nickname?: string,
    @Args('dateOfBirth', { nullable: true }) dateOfBirth?: Date,
    @Args('nationality', { nullable: true }) nationality?: string,
    @Args('height', { nullable: true }) height?: string,
    @Args('weight', { nullable: true }) weight?: number,
    @Args('reach', { nullable: true }) reach?: string,
    @Args('stance', { nullable: true }) stance?: string,
  ): Promise<Fighter | null> {
    return this.fighterRepository.update(id, {
      firstName,
      lastName,
      weightClass: weightClassId ? { id: weightClassId } as WeightClassEntity : undefined,
      nickname,
      dateOfBirth,
      nationality,
      height,
      weight,
      reach,
      stance,
    });
  }

  @Mutation(() => Boolean)
  async deleteFighter(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    await this.fighterRepository.delete(id);
    return true;
  }
} 
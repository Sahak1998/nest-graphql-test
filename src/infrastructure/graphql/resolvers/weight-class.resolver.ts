import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { WeightClass } from '../types/weight-class.type';
import { IWeightClassRepository } from '../../../domain/repositories/weight-class.repository.interface';
import { Inject } from '@nestjs/common';
import { WEIGHT_CLASS_REPOSITORY } from '../../../domain/repositories/weight-class.repository.interface';
import { WeightClass as WeightClassEntity } from '../../../domain/entities/weight-class.entity';

@Resolver(() => WeightClass)
export class WeightClassResolver {
  constructor(
    @Inject(WEIGHT_CLASS_REPOSITORY)
    private readonly weightClassRepository: IWeightClassRepository,
  ) {}

  @Query(() => WeightClass, { nullable: true })
  async weightClass(@Args('id', { type: () => ID }) id: string): Promise<WeightClass | null> {
    return this.weightClassRepository.findById(id);
  }

  @Query(() => [WeightClass])
  async weightClasses(): Promise<WeightClass[]> {
    return this.weightClassRepository.findAll();
  }

  @Query(() => WeightClass, { nullable: true })
  async weightClassByName(@Args('name') name: string): Promise<WeightClass | null> {
    return this.weightClassRepository.findByName(name);
  }

  @Mutation(() => WeightClass)
  async createWeightClass(
    @Args('name') name: string,
    @Args('weightLimit', { type: () => Float }) weightLimit: number,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<WeightClass> {
    return this.weightClassRepository.create({
      name,
      weightLimit,
      description,
    });
  }

  @Mutation(() => WeightClass, { nullable: true })
  async updateWeightClass(
    @Args('id', { type: () => ID }) id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('weightLimit', { type: () => Float, nullable: true }) weightLimit?: number,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<WeightClass | null> {
    return this.weightClassRepository.update(id, {
      name,
      weightLimit,
      description,
    });
  }

  @Mutation(() => Boolean)
  async deleteWeightClass(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    await this.weightClassRepository.delete(id);
    return true;
  }
} 
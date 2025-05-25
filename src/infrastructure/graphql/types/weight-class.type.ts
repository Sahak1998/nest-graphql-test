import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { Fighter } from './fighter.type';

@ObjectType()
export class WeightClass {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  weightLimit: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Fighter], { nullable: true })
  fighters?: Fighter[];
} 
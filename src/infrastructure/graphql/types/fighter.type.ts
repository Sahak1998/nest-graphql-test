import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { WeightClass } from './weight-class.type';

@ObjectType()
export class Fighter {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  height?: string;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field({ nullable: true })
  reach?: string;

  @Field({ nullable: true })
  stance?: string;

  @Field(() => Float)
  wins: number;

  @Field(() => Float)
  losses: number;

  @Field(() => Float)
  draws: number;

  @Field(() => Float)
  knockouts: number;

  @Field(() => Float)
  submissions: number;

  @Field(() => Float)
  rankingPoints: number;

  @Field(() => WeightClass)
  weightClass: WeightClass;
} 
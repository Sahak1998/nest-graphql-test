import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Event } from './event.type';
import { Fighter } from './fighter.type';

@ObjectType()
export class Fight {
  @Field(() => ID)
  id: string;

  @Field(() => Event)
  event: Event;

  @Field(() => Fighter)
  fighter1: Fighter;

  @Field(() => Fighter)
  fighter2: Fighter;

  @Field({ nullable: true })
  winnerId?: string;

  @Field({ nullable: true })
  result?: string;

  @Field(() => Int, { nullable: true })
  round?: number;

  @Field({ nullable: true })
  time?: string;

  @Field()
  isCompleted: boolean;

  @Field()
  isTitleFight: boolean;
} 
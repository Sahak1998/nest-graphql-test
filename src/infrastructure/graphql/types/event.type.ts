import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Fight } from './fight.type';

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  date: Date;

  @Field()
  location: string;

  @Field({ nullable: true })
  venue?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isCompleted: boolean;

  @Field(() => [Fight], { nullable: true })
  fights?: Fight[];
} 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../../domain/entities/fighter.entity';
import { WeightClass } from '../../domain/entities/weight-class.entity';
import { Event } from '../../domain/entities/event.entity';
import { Fight } from '../../domain/entities/fight.entity';
import { FighterRepository } from '../repositories/fighter.repository';
import { WeightClassRepository } from '../repositories/weight-class.repository';
import { EventRepository } from '../repositories/event.repository';
import { FightRepository } from '../repositories/fight.repository';
import { RankingService } from '../../application/services/ranking.service';
import { FighterResolver } from './resolvers/fighter.resolver';
import { WeightClassResolver } from './resolvers/weight-class.resolver';
import { EventResolver } from './resolvers/event.resolver';
import { FightResolver } from './resolvers/fight.resolver';
import { FIGHTER_REPOSITORY } from '../../domain/repositories/fighter.repository.interface';
import { WEIGHT_CLASS_REPOSITORY } from '../../domain/repositories/weight-class.repository.interface';
import { EVENT_REPOSITORY } from '../../domain/repositories/event.repository.interface';
import { FIGHT_REPOSITORY } from '../../domain/repositories/fight.repository.interface';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fighter, WeightClass, Event, Fight]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'ranking',
    }),
  ],
  providers: [
    {
      provide: FIGHTER_REPOSITORY,
      useClass: FighterRepository,
    },
    {
      provide: WEIGHT_CLASS_REPOSITORY,
      useClass: WeightClassRepository,
    },
    {
      provide: EVENT_REPOSITORY,
      useClass: EventRepository,
    },
    {
      provide: FIGHT_REPOSITORY,
      useClass: FightRepository,
    },
    FighterRepository,
    WeightClassRepository,
    EventRepository,
    FightRepository,
    RankingService,
    FighterResolver,
    WeightClassResolver,
    EventResolver,
    FightResolver,
  ],
  exports: [
    FIGHTER_REPOSITORY,
    WEIGHT_CLASS_REPOSITORY,
    EVENT_REPOSITORY,
    FIGHT_REPOSITORY,
    FighterRepository,
    WeightClassRepository,
    EventRepository,
    FightRepository,
    RankingService,
  ],
})
export class GraphQLModule {} 
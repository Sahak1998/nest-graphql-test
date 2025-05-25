import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RankingQueueProcessor } from './ranking-queue.processor';
import { RankingService } from '../../application/services/ranking.service';
import { FighterRepository } from '../repositories/fighter.repository';
import { GraphQLModule } from '../graphql/graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../../domain/entities/fighter.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ranking',
    }),
    GraphQLModule,
    TypeOrmModule.forFeature([Fighter]),
  ],
  providers: [RankingQueueProcessor, RankingService, FighterRepository],
  exports: [RankingQueueProcessor],
})
export class RankingQueueModule {} 
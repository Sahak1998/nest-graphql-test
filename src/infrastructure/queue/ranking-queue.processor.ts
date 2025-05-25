import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { RankingService } from '../../application/services/ranking.service';
import { Logger } from '@nestjs/common';

@Processor({
  name: 'ranking',
})
export class RankingQueueProcessor {
  private readonly logger = new Logger(RankingQueueProcessor.name);

  constructor(private readonly rankingService: RankingService) {}

  @Process({
    name: 'ranking',
  })
  async handleRankingUpdate(job: Job) {
    try {
      const { winnerId, loserId, result } = job.data;
      this.logger.debug(`Processing ranking update for fight: ${winnerId} vs ${loserId}`);
      await this.rankingService.updateRankingsAfterFight(winnerId, loserId, result);
      this.logger.debug('Ranking update completed successfully');
    } catch (error) {
      this.logger.error(`Failed to process ranking update: ${error.message}`, error.stack);
      throw error;
    }
  }
} 
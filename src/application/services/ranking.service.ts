import { Injectable, Inject } from '@nestjs/common';
import { FightResult } from '../../domain/entities/fight.entity';
import { IFighterRepository } from '../../domain/repositories/fighter.repository.interface';
import { FIGHTER_REPOSITORY } from '../../domain/repositories/fighter.repository.interface';

@Injectable()
export class RankingService {
  private readonly POINTS = {
    [FightResult.KNOCKOUT]: 4,
    [FightResult.SUBMISSION]: 4,
    [FightResult.DECISION]: 3,
    [FightResult.DRAW]: 1,
    [FightResult.NO_CONTEST]: 0,
  };

  constructor(
    @Inject(FIGHTER_REPOSITORY)
    private readonly fighterRepository: IFighterRepository,
  ) {}

  async updateRankingsAfterFight(
    winnerId: string,
    loserId: string,
    result: FightResult,
  ): Promise<void> {
    const winner = await this.fighterRepository.findById(winnerId);
    const loser = await this.fighterRepository.findById(loserId);

    if (!winner || !loser) {
      throw new Error('Fighters not found');
    }

    // Update winner's points
    const winnerPoints = winner.rankingPoints + this.POINTS[result];
    await this.fighterRepository.updateRankingPoints(winnerId, winnerPoints);

    // Update loser's points (no points for loss)
    await this.fighterRepository.updateRankingPoints(loserId, loser.rankingPoints);

    // Update statistics
    if (result === FightResult.KNOCKOUT) {
      await this.fighterRepository.update(winnerId, {
        knockouts: winner.knockouts + 1,
        wins: winner.wins + 1,
      });
      await this.fighterRepository.update(loserId, {
        losses: loser.losses + 1,
      });
    } else if (result === FightResult.SUBMISSION) {
      await this.fighterRepository.update(winnerId, {
        submissions: winner.submissions + 1,
        wins: winner.wins + 1,
      });
      await this.fighterRepository.update(loserId, {
        losses: loser.losses + 1,
      });
    } else if (result === FightResult.DECISION) {
      await this.fighterRepository.update(winnerId, {
        wins: winner.wins + 1,
      });
      await this.fighterRepository.update(loserId, {
        losses: loser.losses + 1,
      });
    } else if (result === FightResult.DRAW) {
      await this.fighterRepository.update(winnerId, {
        draws: winner.draws + 1,
      });
      await this.fighterRepository.update(loserId, {
        draws: loser.draws + 1,
      });
    }
  }

  async getRankingsByWeightClass(weightClassId: string) {
    return this.fighterRepository.getRankingsByWeightClass(weightClassId);
  }
} 
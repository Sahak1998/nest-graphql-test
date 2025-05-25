import { Fight } from '../entities/fight.entity';
import { FightResult } from '../entities/fight.entity';

export const FIGHT_REPOSITORY = 'FIGHT_REPOSITORY';

export interface IFightRepository {
  findById(id: string): Promise<Fight | null>;
  findAll(): Promise<Fight[]>;
  create(fight: Partial<Fight>): Promise<Fight>;
  update(id: string, fight: Partial<Fight>): Promise<Fight | null>;
  delete(id: string): Promise<void>;
  findByEvent(eventId: string): Promise<Fight[]>;
  findByFighter(fighterId: string): Promise<Fight[]>;
  markAsCompleted(id: string, winnerId: string, result: FightResult, round: number, time: string): Promise<Fight | null>;
} 
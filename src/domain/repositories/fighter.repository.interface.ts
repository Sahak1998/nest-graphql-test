import { Fighter } from '../entities/fighter.entity';

export const FIGHTER_REPOSITORY = 'FIGHTER_REPOSITORY';

export interface IFighterRepository {
  findById(id: string): Promise<Fighter | null>;
  findAll(): Promise<Fighter[]>;
  findByWeightClass(weightClassId: string): Promise<Fighter[]>;
  create(fighter: Partial<Fighter>): Promise<Fighter>;
  update(id: string, fighter: Partial<Fighter>): Promise<Fighter | null>;
  delete(id: string): Promise<void>;
  updateRankingPoints(id: string, points: number): Promise<Fighter | null>;
  getRankingsByWeightClass(weightClassId: string): Promise<Fighter[]>;
} 
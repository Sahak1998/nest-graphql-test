import { WeightClass } from '../entities/weight-class.entity';

export const WEIGHT_CLASS_REPOSITORY = 'WEIGHT_CLASS_REPOSITORY';

export interface IWeightClassRepository {
  findById(id: string): Promise<WeightClass | null>;
  findAll(): Promise<WeightClass[]>;
  create(weightClass: Partial<WeightClass>): Promise<WeightClass>;
  update(id: string, weightClass: Partial<WeightClass>): Promise<WeightClass | null>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<WeightClass | null>;
} 
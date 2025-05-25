import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../../domain/entities/fighter.entity';
import { IFighterRepository } from '../../domain/repositories/fighter.repository.interface';

@Injectable()
export class FighterRepository implements IFighterRepository {
  constructor(
    @InjectRepository(Fighter)
    private readonly repository: Repository<Fighter>,
  ) {}

  async findById(id: string): Promise<Fighter | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Fighter[]> {
    return this.repository.find();
  }

  async findByWeightClass(weightClassId: string): Promise<Fighter[]> {
    return this.repository.find({
      where: { weightClass: { id: weightClassId } },
      order: { rankingPoints: 'DESC' },
    });
  }

  async create(fighter: Partial<Fighter>): Promise<Fighter> {
    const newFighter = this.repository.create(fighter);
    return this.repository.save(newFighter);
  }

  async update(id: string, fighter: Partial<Fighter>): Promise<Fighter | null> {
    await this.repository.update(id, fighter);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async updateRankingPoints(id: string, points: number): Promise<Fighter | null> {
    await this.repository.update(id, { rankingPoints: points });
    return this.findById(id);
  }

  async getRankingsByWeightClass(weightClassId: string): Promise<Fighter[]> {
    return this.repository.find({
      where: { weightClass: { id: weightClassId } },
      order: { rankingPoints: 'DESC' },
    });
  }
} 
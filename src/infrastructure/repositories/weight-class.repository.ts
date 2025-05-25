import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightClass } from '../../domain/entities/weight-class.entity';
import { IWeightClassRepository } from '../../domain/repositories/weight-class.repository.interface';

@Injectable()
export class WeightClassRepository implements IWeightClassRepository {
  constructor(
    @InjectRepository(WeightClass)
    private readonly repository: Repository<WeightClass>,
  ) {}

  async findById(id: string): Promise<WeightClass | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<WeightClass[]> {
    return this.repository.find();
  }

  async create(weightClass: Partial<WeightClass>): Promise<WeightClass> {
    const newWeightClass = this.repository.create(weightClass);
    return this.repository.save(newWeightClass);
  }

  async update(id: string, weightClass: Partial<WeightClass>): Promise<WeightClass | null> {
    await this.repository.update(id, weightClass);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByName(name: string): Promise<WeightClass | null> {
    return this.repository.findOne({ where: { name } });
  }
} 
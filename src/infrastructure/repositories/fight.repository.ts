import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../../domain/entities/fight.entity';
import { IFightRepository } from '../../domain/repositories/fight.repository.interface';
import { FightResult } from '../../domain/entities/fight.entity';

@Injectable()
export class FightRepository implements IFightRepository {
  constructor(
    @InjectRepository(Fight)
    private readonly repository: Repository<Fight>,
  ) {}

  async findById(id: string): Promise<Fight | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['event', 'fighter1', 'fighter2'],
    });
  }

  async findAll(): Promise<Fight[]> {
    return this.repository.find({
      relations: ['event', 'fighter1', 'fighter2'],
    });
  }

  async create(fight: Partial<Fight>): Promise<Fight> {
    const newFight = this.repository.create(fight);
    return this.repository.save(newFight);
  }

  async update(id: string, fight: Partial<Fight>): Promise<Fight | null> {
    await this.repository.update(id, fight);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByEvent(eventId: string): Promise<Fight[]> {
    return this.repository.find({
      where: { event: { id: eventId } },
      relations: ['event', 'fighter1', 'fighter2'],
    });
  }

  async findByFighter(fighterId: string): Promise<Fight[]> {
    return this.repository.find({
      where: [
        { fighter1: { id: fighterId } },
        { fighter2: { id: fighterId } },
      ],
      relations: ['event', 'fighter1', 'fighter2'],
    });
  }

  async markAsCompleted(id: string, winnerId: string, result: FightResult, round: number, time: string): Promise<Fight | null> {
    await this.repository.update(id, {
      isCompleted: true,
      winnerId,
      result,
      round,
      time,
    });
    return this.findById(id);
  }
} 
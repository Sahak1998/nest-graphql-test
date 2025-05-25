import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Fighter } from './fighter.entity';
import { Event } from './event.entity';

export enum FightResult {
  KNOCKOUT = 'KNOCKOUT',
  SUBMISSION = 'SUBMISSION',
  DECISION = 'DECISION',
  DRAW = 'DRAW',
  NO_CONTEST = 'NO_CONTEST'
}

export enum Round {
  ROUND_1 = 1,
  ROUND_2 = 2,
  ROUND_3 = 3,
  ROUND_4 = 4,
  ROUND_5 = 5
}

@Entity('fights')
export class Fight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, event => event.fights)
  event: Event;

  @ManyToOne(() => Fighter, fighter => fighter.fightsAsFighter1)
  fighter1: Fighter;

  @ManyToOne(() => Fighter, fighter => fighter.fightsAsFighter2)
  fighter2: Fighter;

  @Column({ nullable: true })
  winnerId: string;

  @Column({ type: 'enum', enum: FightResult, nullable: true })
  result: FightResult;

  @Column({ type: 'enum', enum: Round, nullable: true })
  round: Round;

  @Column({ nullable: true })
  time: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: false })
  isTitleFight: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
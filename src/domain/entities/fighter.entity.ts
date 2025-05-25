import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Fight } from './fight.entity';
import { WeightClass } from './weight-class.entity';

@Entity('fighters')
export class Fighter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  reach: string;

  @Column({ nullable: true })
  stance: string;

  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  losses: number;

  @Column({ default: 0 })
  draws: number;

  @Column({ default: 0 })
  knockouts: number;

  @Column({ default: 0 })
  submissions: number;

  @Column({ default: 0 })
  rankingPoints: number;

  @ManyToOne(() => WeightClass, weightClass => weightClass.fighters)
  weightClass: WeightClass;

  @OneToMany(() => Fight, fight => fight.fighter1)
  fightsAsFighter1: Fight[];

  @OneToMany(() => Fight, fight => fight.fighter2)
  fightsAsFighter2: Fight[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
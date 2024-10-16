import { User } from "../../users/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";

@Entity("urls")
export class Url {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.urls)
  @JoinColumn({ name: "userId" })
  user?: User;

  @Column()
  originalUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  clicks: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }

    if (!this.userId) {
      this.userId = uuidv4();
    }
  }
}

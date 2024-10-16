import { Url } from "@modules/urls/entities/Url";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column()
  avatar?: string;

  @OneToMany(() => Url, (url) => url.user)
  urls?: Url[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

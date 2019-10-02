import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Users {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", default: "" })
  role: string;

  @Column({ type: "varchar", default: "" })
  avatarUrl: string;

  @CreateDateColumn({ type: "timestamp" })
  createAt: number;

  @UpdateDateColumn({ type: "timestamp" })
  updateAt: number;
}

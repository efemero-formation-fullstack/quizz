import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    username: string;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column({ type: 'date' })
    birthdate: Date;

    @Column({ type: 'enum', enum: ['M', 'F', 'O'] })
    gender: string;

    @Column()
    password: string;

    @Column({ default: UserRole.USER })
    role: UserRole;
}
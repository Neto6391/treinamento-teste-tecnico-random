import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async seedAdmin() {
    const exists = await this.repo.findOne({ where: { email: 'admin@local.com' } });
    if (!exists) {
      const passwordHash = await bcrypt.hash('admin', 10);
      const user = this.repo.create({ email: 'admin@local.com', passwordHash });
      await this.repo.save(user);
    }
  }

  async findByEmail(email: string): Promise<User  | null> {
    return this.repo.findOne({ where: { email } }) ?? null;
  }

  async findByUserId(userId: Number): Promise<Omit<User, "passwordHash">  | null> {
    return this.repo.findOne({ where: { id: +userId } }) ?? null;
  }

  async create(data: Partial<User>) {
     const passwordHash = await bcrypt.hash('admin', 10);
     data.passwordHash = passwordHash;
     const user = this.repo.create(data);
     return this.repo.save(user);
  }
}

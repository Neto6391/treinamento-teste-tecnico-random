import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Task>) {
    const task = this.repo.create(data);
    return this.repo.save(task);
  }

  async update(id: number, data: Partial<Task>) {
    const existingTask  = await this.repo.preload({ id: +id, ...data });
    if (!existingTask) throw new NotFoundException('Task not found');
    
    return this.repo.save(existingTask);
  }

  async remove(id: number) {
    const t = await this.repo.findOne({ where: { id } });
    if (!t) throw new NotFoundException('Task not found');
    await this.repo.remove(t);
    return { deleted: true };
  }
}

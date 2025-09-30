import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private api: ApiService) {}

  list(): Promise<Task[]> {
    return this.api.get('/tasks');
  }
  create(dto: Partial<Task>): Promise<Task> {
    return this.api.post('/tasks', dto);
  }
  update(id: number, dto: Partial<Task>): Promise<Task> {
    return this.api.patch(`/tasks/${id}`, dto);
  }
  remove(id: number): Promise<{ deleted: boolean }> {
    return this.api.delete(`/tasks/${id}`);
  }
}

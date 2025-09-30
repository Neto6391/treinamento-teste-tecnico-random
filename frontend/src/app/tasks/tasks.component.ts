import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>Tasks</h1>
        <button (click)="logout()">Sair</button>
      </div>

      <form (ngSubmit)="create()" #form="ngForm" style="margin-bottom:1rem;">
        <input name="title" [(ngModel)]="newTitle" placeholder="Nova task..." />
        <button type="submit">Criar</button>
      </form>

      <div *ngFor="let t of tasks" class="task">
        <strong>{{t.title}}</strong> <!-- BUG: title -->
        <select [(ngModel)]="t.status" (ngModelChange)="save(t)">
          <option value="todo">todo</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
        </select>
        <button (click)="remove(t)">Excluir</button>
      </div>
    </div>
  `
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';

  constructor(private tasksService: TasksService) {}

  async ngOnInit() {
    this.tasks = await this.tasksService.list();
  }

  async create() {
    if (!this.newTitle.trim()) return;
    const created = await this.tasksService.create({ name: this.newTitle, status: 'todo' });
    this.tasks.push(created);
    this.newTitle = '';
  }

  async save(t: Task) {
    await this.tasksService.update(t.id, { status: t.status });
  }

  async remove(t: Task) {
    await this.tasksService.remove(t.id);
    this.tasks = this.tasks.filter(x => x.id !== t.id);
  }

  logout() {
    localStorage.removeItem('auth_token'); // BUG
    location.href = '/login';
  }
}

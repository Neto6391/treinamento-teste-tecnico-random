import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TasksComponent, canActivate: [authGuard] }
];

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
  <div class="container">
    <h1>Login</h1>
    <form (ngSubmit)="submit()" #form="ngForm">
      <input data-testid="email-input" name="email" [(ngModel)]="email" placeholder="email" required />
      <input data-testid="password" name="password" [(ngModel)]="password" placeholder="senha" type="password" required />
      <button data-testid="login-btn" type="submit">Entrar</button>
      <p><small class="muted">use admin&#64;local / admin</small></p>
    </form>
  </div>
  `
})
export class LoginComponent {
  email = 'admin@local';
  password = 'admin';

  constructor(private auth: AuthService, private router: Router) {}

  async submit() {
    await this.auth.login(this.email, this.password);
    this.router.navigateByUrl('/');
  }
}

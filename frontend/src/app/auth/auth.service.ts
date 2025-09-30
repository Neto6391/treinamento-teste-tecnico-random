import { Injectable, signal, inject } from '@angular/core';
import { ApiService } from '../services/api.service';

// 1. Crie uma interface para a resposta da API
interface AuthResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);

  // 2. Crie um Signal para o estado de autenticação
  // Ele inicia com o valor do token salvo, se existir.
  isAuthenticated = signal<boolean>(!!this.getToken());

  async login(email: string, password: string) {
    // Usa a interface para garantir uma resposta tipada
    const { access_token } = await this.api.post<AuthResponse>('/auth/login', { email, password });
    this.setToken(access_token);
  }

  logout() {
    this.removeToken();
  }

  // 3. Centraliza o acesso ao localStorage
  private setToken(token: string) {
    localStorage.setItem('auth_token', token);
    this.isAuthenticated.set(true); // Atualiza o estado
  }

  private removeToken() {
    localStorage.removeItem('auth_token');
    this.isAuthenticated.set(false); // Atualiza o estado
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
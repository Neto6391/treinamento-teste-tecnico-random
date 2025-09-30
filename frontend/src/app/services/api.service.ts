// Em src/app/services/api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  // Note como a lógica de 'Authorization' e 'localStorage' SUMIU daqui.
  // O Interceptor está cuidando disso para todos os métodos!

  get<T>(path: string) {
    return firstValueFrom(this.http.get<T>(this.base + path));
  }

  post<T>(path: string, body: any) {
    // O HttpClient já converte o 'body' para JSON e adiciona o 'Content-Type'
    return firstValueFrom(this.http.post<T>(this.base + path, body));
  }

  patch<T>(path: string, body: any) {
    return firstValueFrom(this.http.patch<T>(this.base + path, body));
  }

  delete<T>(path: string) {
    return firstValueFrom(this.http.delete<T>(this.base + path));
  }
}
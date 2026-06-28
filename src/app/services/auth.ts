import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Ajuste esta URL para o caminho real da sua pasta dentro do htdocs do XAMPP
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Agora retorna um Observable ao invés de um boolean síncrono
  login(usuario: string, chave: string): Observable<any> {
    const payload = { usuario, chave };
    return this.http.post(`${this.apiUrl}/login.php`, payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Ajuste esta URL para o caminho real da sua pasta dentro do htdocs do XAMPP
  private apiUrl = 'http://192.168.15.88/chamada-facil-api';

  constructor(private http: HttpClient) {}

  // Agora retorna um Observable ao invés de um boolean síncrono
  login(usuario: string, chave: string): Observable<any> {
    const payload = { usuario, chave };
    return this.http.post(`${this.apiUrl}/login.php`, payload);
  }
}

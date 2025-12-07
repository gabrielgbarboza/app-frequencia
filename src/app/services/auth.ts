import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // A função que o teste espera
  login(usuario: string, chave: string): boolean {
    if (usuario === 'professor' && chave === '1234') {
      return true;
    } else {
      return false;
    }
  }
}

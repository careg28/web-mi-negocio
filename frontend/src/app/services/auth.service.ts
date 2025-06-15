import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios'; // Cambia si usas otro puerto

  constructor(private http: HttpClient) {}
  

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('nombre', response.nombre); // Nuevo
          localStorage.setItem('correo', response.correo); // Nuevo
        }
      })
    );
  }
  
  


 logout() {
  // Elimina el token y datos del usuario
  localStorage.removeItem('jwt');
  localStorage.removeItem('username');
  localStorage.removeItem('rol');
  localStorage.removeItem('nombre'); // Si lo guardas
  localStorage.removeItem('correo'); // Si lo guardas
  // Si guardas más datos, elimínalos aquí también
}


  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getRol(): string | null {
  return localStorage.getItem('rol');
}
}


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Rol } from '../enums/rol';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

 canActivate(): boolean {
  const token = localStorage.getItem('jwt');
  const rol = localStorage.getItem('rol');
 if (token && rol === Rol.ADMIN) {
      return true;
    }
  this.router.navigate(['/login']);
  return false;
}
}


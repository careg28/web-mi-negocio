import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
 constructor(private authService: AuthService, private router: Router) {}
  username = localStorage.getItem('username');
  rol = localStorage.getItem('rol');
  nombre = localStorage.getItem('nombre'); // Nuevo
  correo = localStorage.getItem('correo'); // Nuevo
  

  ngOnInit() {
    // Puedes cargar más datos si quieres
  }
  
   cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige al login
  }

}

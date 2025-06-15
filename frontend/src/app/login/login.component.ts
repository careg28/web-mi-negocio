import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (resp) => {
        // Si quieres guardar el token aquí (opcional, depende de tu AuthService)
        // this.authService.saveToken(resp.token);

        // Redirige al home o dashboard
        this.router.navigate(['/admin-panel']);
      },
      error: (err) => {
        this.errorMsg = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
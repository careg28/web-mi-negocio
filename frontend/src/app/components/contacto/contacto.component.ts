import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare const grecaptcha: any;
@Component({
   selector: 'app-contacto',
   standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  cliente: Cliente = { nombre: '', correo: '', descripcion: '' };
  mensaje: string = '';
  botonDeshabilitado: boolean = false;

   ngOnInit() {
    this.verificarBloqueo();
  }

  constructor(private clienteService: ClienteService) {}

    enviar() {
    // ✅ Obtener el token generado por reCAPTCHA
    const token = grecaptcha.getResponse();
    const ahora = Date.now();
     // Verifica si ya hay un bloqueo activo
    const ultimoEnvio = localStorage.getItem('bloqueoContacto');
    if (ultimoEnvio && ahora - parseInt(ultimoEnvio) < 2 * 60 * 1000) {
      alert('Ya enviaste un mensaje. Espera 2 minutos antes de volver a enviar.');
      return;
    }
    if (!token) {
      alert('Debes completar el captcha');
      return;
    }
    
    // ✅ Añadir el token 
    const datos = {
      ...this.cliente,
      recaptchaToken: token
    };

    this.clienteService.registrarCliente(datos).subscribe({
      next: () => {
        this.mensaje = '¡Gracias por tu mensaje!';
        grecaptcha.reset(); // Limpia el reCAPTCHA para enviar otro
        this.botonDeshabilitado = true;
        // Guarda el timestamp del envío
        localStorage.setItem('bloqueoContacto', ahora.toString());

        // Reactiva el botón automáticamente después de 2 minutos
        setTimeout(() => {
          this.botonDeshabilitado = false;
          localStorage.removeItem('bloqueoContacto');
        }, 2 * 60 * 1000);
      },
      error: () => this.mensaje = 'Hubo un error, intenta más tarde.'
    });
  }

  verificarBloqueo() {
    const ahora = Date.now();
    const ultimoEnvio = localStorage.getItem('bloqueoContacto');

    if (ultimoEnvio && ahora - parseInt(ultimoEnvio) < 2 * 60 * 1000) {
      this.botonDeshabilitado = true;

      // Tiempo restante para reactivar
      const tiempoRestante = 2 * 60 * 1000 - (ahora - parseInt(ultimoEnvio));
      setTimeout(() => {
        this.botonDeshabilitado = false;
        localStorage.removeItem('bloqueoContacto');
      }, tiempoRestante);
    }
  }
}

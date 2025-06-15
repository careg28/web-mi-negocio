import { Component } from '@angular/core';

import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-contacto',
   standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  cliente: Cliente = { nombre: '', correo: '', descripcion: '' };
  mensaje: string = '';

  constructor(private clienteService: ClienteService) {}

  enviar() {
    console.log('Enviando cliente:', this.cliente); 
    this.clienteService.registrarCliente(this.cliente).subscribe({
      next: () => this.mensaje = '¡Gracias por tu mensaje!',
      error: () => this.mensaje = 'Hubo un error, intenta más tarde.'
    });
  }
}

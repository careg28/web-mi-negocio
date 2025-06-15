import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactoComponent } from '../../components/contacto/contacto.component';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ esto es esencial
  imports: [RouterLink, ContactoComponent], // 👈 ahora sí se usarán
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}

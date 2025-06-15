import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactoComponent } from '../../components/contacto/contacto.component';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {

}

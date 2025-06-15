import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';


export const routes: Routes = [
  // Layout público (sitio web del cliente)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]
  },

  // Layout administrativo (incluye login)
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }, // Login con diseño admin
      {
        path: 'admin-panel',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: AdminPanelComponent },
          { path: 'clientes', component: ClientesComponent }
        ]
      }
    ]
  },

  // Página 404
  { path: '**', component: NotFoundComponent }
];


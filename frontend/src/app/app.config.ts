import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './utils/mat-paginator-intl';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    // Otros providers si tienes
   { provide: MatPaginatorIntl, useFactory: CustomPaginator }
  ]
};



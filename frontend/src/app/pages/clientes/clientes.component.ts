import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [MatPaginatorModule,  // 👈 IMPORTANTE
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
     MatFormFieldModule,
     MatCardModule,
    MatProgressSpinnerModule
    
],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'correo', 'descripcion'];
  dataSource = new MatTableDataSource<Cliente>([]);
  loading = true;

  private _paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator)
set paginator(paginator: MatPaginator) {
  this._paginator = paginator;
  this.dataSource.paginator = this._paginator;
}

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
        this.loading = false;
        this.dataSource.filterPredicate = (data: Cliente, filter: string) => {
  return (
    data.nombre.toLowerCase().includes(filter) ||
    data.correo.toLowerCase().includes(filter) ||
    data.descripcion.toLowerCase().includes(filter)
  );
};
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    
    setTimeout(() => {
    this.dataSource.paginator = this.paginator;
  });
  }

  aplicarFiltro(event: Event) {
  const valorFiltro = (event.target as HTMLInputElement).value;
  this.dataSource.filter = valorFiltro.trim().toLowerCase();
}
  
}



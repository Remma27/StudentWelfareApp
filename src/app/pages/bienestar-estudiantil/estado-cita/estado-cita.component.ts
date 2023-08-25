import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-estado-cita',
  templateUrl: './estado-cita.component.html',
  styleUrls: ['./estado-cita.component.scss']
})
export class EstadoCitaComponent {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


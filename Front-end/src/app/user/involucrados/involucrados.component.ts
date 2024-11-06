import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Involved } from '../../../types/complaint.type';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UserService } from '../../services/user.service';
import { map, Observable, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-involucrados',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatAutocompleteModule, 
    MatFormFieldModule, ReactiveFormsModule,  AsyncPipe],
  templateUrl: './involucrados.component.html',
  styleUrls: ['./involucrados.component.css']
})
export class InvolucradosComponent implements OnInit {

  personasSeleccionadas: string[] = [];
  personDescription: string = '';
  manualName: string = '';  
  complaint: any;
  employees = []
  filteredEmployees!: Observable<any[]>;
  employeeControl = new FormControl('');

  constructor(
    private complaintDataService: ComplaintDataService, 
    private userService: UserService, 
    private router: Router,
    private location: Location
  ) {

    this.complaint = this.complaintDataService.getComplaintData();
    if(this.complaint)
    {     
      this.personasSeleccionadas = this.complaint.personInvolveds.map((persona: any) => (
          persona.names 
      ));
      this.personDescription = this.complaint.personInvolveds[0]?.personDescription;
    }

    this.userService.getPublicEmployees().subscribe(
      res =>{
        this.employees = res.content;
      }
    );
  }
  
  ngOnInit(): void {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): any {
     const filterValue = value.toLowerCase();

    return this.employees.filter((x: { names: string; position: string}) => 
      x.names.toLowerCase().includes(filterValue) || x.position?.toLowerCase().includes(filterValue));
  }

  actualizarSeleccionold(persona: string, event: Event) {
    const checkbox = (event.target as HTMLInputElement);
    if (checkbox.checked) {
      this.personasSeleccionadas.push(persona);
    } else {
      this.personasSeleccionadas = this.personasSeleccionadas.filter(p => p !== persona);
    }
  }

 addSelection() {
    var name = this.employeeControl.value
    if (name) {
      this.personasSeleccionadas.push(name);
      this.employees = this.employees.filter((x: { names: string; }) => x.names != name)
      this.employeeControl.setValue("")
    } 
  }

  guardarCausal() {
    if (this.manualName) {
      const newCausal = `${this.manualName}`;
      this.personasSeleccionadas.push(newCausal);

      this.manualName = '';

      console.log('Causal agregado manualmente:', newCausal);  
    } else {
      console.log('Debe ingresar un nombre y apellido');
    }
  }

  guardarDatosYRedirigir(event: Event) {
    event.preventDefault();  

    const personInvolveds = this.personasSeleccionadas.map(persona => ({
      names: persona,   
      personDescription: this.personDescription
    }));

    this.complaintDataService.setComplaintData({
      personInvolveds: personInvolveds
    });

    console.log('Datos guardados de personas involucradas:', personInvolveds);

    this.router.navigate(['/denunciante']);
  }

  goBack() {
    this.router.navigate(['/report']);
  }
    
}

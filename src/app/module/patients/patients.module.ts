import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientComponent } from './patient/patient.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { GridComponent } from 'src/app/shared/grid/grid.component';


@NgModule({
  declarations: [PatientComponent, GridComponent, BookAppointmentComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    PrimeModule,
    SharedModuleModule
  ]
})
export class PatientsModule { }

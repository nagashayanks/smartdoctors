import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientComponent } from './patient/patient.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';


@NgModule({
  declarations: [PatientComponent, BookAppointmentComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModuleModule
  ]
})
export class PatientsModule { }

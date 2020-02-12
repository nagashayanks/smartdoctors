import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientComponent } from './patient/patient.component';
import { PrimeModule } from 'src/app/shared/primeng-module';


@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    PrimeModule
  ]
})
export class PatientsModule { }

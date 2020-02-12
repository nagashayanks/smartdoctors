import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';


const routes: Routes = [
  {
    path: '',
    component: PatientComponent
  },
  {
    path: 'book-appointment',
    component: BookAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }

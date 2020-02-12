import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';


const routes: Routes = [
  {
    path: '',
    component: DoctorComponent
  },
  {
    path: 'appoinment',
    component: AppoinmentComponent
  },
  {
    path: 'book-appoinment/:id',
    component: BookAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';


const routes: Routes = [
  {
    path: '',
    component: DoctorComponent
  },
  {
    path: 'appoinment',
    component: AppoinmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }

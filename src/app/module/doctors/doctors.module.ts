import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';




@NgModule({
  declarations: [DoctorComponent, AppoinmentComponent],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModuleModule
  ]
})
export class DoctorsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { GridComponent } from 'src/app/shared/grid/grid.component';
import { PrimeModule } from 'src/app/shared/primeng-module';



@NgModule({
  declarations: [DoctorComponent, AppoinmentComponent, GridComponent],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModuleModule,
    PrimeModule
  ]
})
export class DoctorsModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth-guard';


const routes: Routes = [
    {
      path: '',
      loadChildren: () => import(`./module/member/member.module`).then(m => m.MemberModule)
    },
    {
      path: 'login',
      loadChildren: () => import(`./module/member/member.module`).then(m => m.MemberModule)
    },
    {
      path: 'doctor',
      loadChildren: () => import(`./module/doctors/doctors.module`).then(m => m.DoctorsModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'patient',
      loadChildren: () => import(`./module/patients/patients.module`).then(m => m.PatientsModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

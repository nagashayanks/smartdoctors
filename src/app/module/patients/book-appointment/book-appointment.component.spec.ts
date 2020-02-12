import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentComponent } from './book-appointment.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { of } from 'rxjs';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { GridComponent } from 'src/app/shared/grid/grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookAppointmentComponent', () => {
  let component: BookAppointmentComponent;
  let fixture: ComponentFixture<BookAppointmentComponent>;
  let api: Service;
  // const fakeActivatedRoute = {
  //   snapshot: { params: { ... } }
  // } as ActivatedRoute;

  const MockUserService = {
    // isValidUser: false,
    // setValidUser: (flag: boolean) => { MockUserService.isValidUser = flag; },
    // currentUser: {
    //   userName: 'Mani',
    //   userId: 1234
    // },
    // validUser: () => MockUserService.isValidUser,
    // loggedUser: () => {
    //   return MockUserService.currentUser;
    // },
    getList(url: string) {
      return of(
        [
          {

            hospitalName: 'Aster',
            date: '13-4-2020',
            slotTime: '15:00',
            patientId: 12453,
            patientName: 'krishna',
            email: 'k@gmail.com',
            mobile: 9089784590
          }
        ]
      );
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAppointmentComponent, GridComponent ],
      imports: [SharedModuleModule, HttpClientTestingModule, PrimeModule, RouterTestingModule],
      providers: [
        { provide: Service, useValue: MockUserService },
        UrlConfig ]
    })
    .compileComponents();
    api = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

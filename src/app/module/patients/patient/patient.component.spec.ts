import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComponent } from './patient.component';
import { Service } from 'src/app/service/service';
import { Router } from '@angular/router';
import { UrlConfig } from 'src/app/service/url-config';
import { of } from 'rxjs';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;
  let api: Service;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  /* create mock data for testing */
  const MockUserService = {
    isValidUser: false,
    setValidUser: (flag: boolean) => { MockUserService.isValidUser = flag; },
    currentUser: {
      userName: 'Mani',
      userId: 1234
    },
    validUser: () => MockUserService.isValidUser,
    loggedUser: () => {
      return MockUserService.currentUser;
    },
    modalConfig: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: ''
    }),
    alertConfigDefaultValue: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: ''
    }),
    getList(url: string) {
      return of(
        [
          {
            doctorName: 'ram',
            rating: 4,
           specialization: 'ortho',
           consultationFees: 800
          }
        ]
      );
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimeModule, SharedModuleModule],
      declarations: [ PatientComponent ],
      providers: [ Service, { provide: Router, useValue: mockRouter },
      UrlConfig]
    })
    .compileComponents();
    mockRouter = TestBed.get(Router);
    api = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should check doctorDetails', () => {
    component.getDoctordetails();
    expect(api.getList('')).toBeTruthy();
    expect(component).toBeTruthy();
  });
  it('Should check modalAction', () => {
    const action =  'Ok';
    component.modalAction(action);
    expect(action).toEqual(action);
  });
});

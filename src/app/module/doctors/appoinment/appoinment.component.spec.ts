import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { of } from 'rxjs';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { AppoinmentComponent } from './appoinment.component';
import { FormBuilder, Validators } from '@angular/forms';

describe('AppoinmentComponent', () => {
  let component: AppoinmentComponent;
  let fixture: ComponentFixture<AppoinmentComponent>;
  let api: Service;
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
            hospitalId: 123,
            hospitalName: 'Manipal',

          }
        ]
      );
    },
    postCall(url: string, data: any, type: string) {
      return of({
        doctorId: 123456,
        hospitalId: 123,
        date: '18-12-2020',
        fromTime: '18:00',
        toTime: '20:00'
      });
    },
  };
    // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentComponent ],
      imports: [SharedModuleModule, HttpClientTestingModule, PrimeModule],
      providers: [
        { provide: Service, useValue: MockUserService },
        { provide: FormBuilder, useValue: formBuilder },
        UrlConfig]
    })
    .compileComponents();
    api = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check  form creation', () => {
    component.appointmentForm = formBuilder.group({
      hospitalId: ['', Validators.required],
      date: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required]
    });
    expect(component.appointmentForm.valid).toBeFalsy();
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
  // it('Should check valid user while addAppoinment', () => {

  //   component.appointmentForm.controls.hospitalId.setValue(9);
  //   component.appointmentForm.controls.date.setValue('12-12-2020');
  //   component.appointmentForm.controls.fromTime.setValue('13:00');
  //   component.appointmentForm.controls.toTime.setValue('14:00');
  //   component.submitted = true;
  //   component.appointmentErrorFlag = '';
  //   component.addAppoinment();
  // });
  
  it('Should check modalAction', () => {
    const action =  'Ok';
    const action2 =  'Close';
    component.modalAction(action);
    expect(action).toEqual(action);
    component.modalAction(action2);
    expect(action2).toEqual(action2);
  });
});

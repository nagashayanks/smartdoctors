import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { ConstantService } from 'src/app/service/constant';
import { CommonService } from 'src/app/service/common-service';
import { CustomValidation } from 'src/app/helper/validation';

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit {
  appointmentForm: FormGroup;
  submitted = false;
  spinner = false;
  appointmentErrorFlag = '';
  hospitalList = [];
  constructor(
    private fb: FormBuilder,
    private api: Service,
    private url: UrlConfig,
    private userConstant: ConstantService,
    public common: CommonService,
    private validate: CustomValidation
  ) { }


  /*  Appointment form controls creation */
  private createForm() {
    this.appointmentForm = this.fb.group({
      hospitalId: ['', Validators.required],
      date: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required]
    });
  }

  /* Modal Action
  @param Ok modal has been closed
 */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.spinner = false;
      this.common.alertConfigDefaultValue();
    } else if (action === 'Close') {
      this.spinner = false;
      this.common.alertConfigDefaultValue();
      this.reset();
    }
  }

  /* Go to the page basedon type
     @param mobile is user input
     @param password is user input
   */
  public addAppoinment() {
    this.submitted = true;
    if (this.appointmentForm.valid && !this.appointmentErrorFlag) {
      this.spinner = true;
      const postObject = {
        doctorId: this.common.loggedUser() ? this.common.loggedUser().userId : null,
        hospitalId: Number(this.appointmentForm.value.hospitalId),
        date: this.validate.convertDate(this.appointmentForm.value.date),
        fromTime: this.validate.timeSplitup(this.appointmentForm.value.fromTime),
        toTime: this.validate.timeSplitup(this.appointmentForm.value.toTime)
      };
      /* Api call*/
      this.api.postCall(this.url.urlConfig().appointment, postObject, 'post').subscribe(appointment => {
        if (appointment.statusCode === 200) {
          this.spinner = false;
          this.common.alertConfig = this.common.modalConfig(
            'Error', appointment.message,
            true, [{ name: 'Close' }]
          );
        } else {
          this.common.alertConfig = this.common.modalConfig(
            'Error', appointment.message,
            true, [{ name: 'Ok' }]
          );
          this.spinner = false;
        }
      });
    }
  }

  /* To check appointment date valid*/
  public appointmentDateValid(event: Date) {
    if (this.validate.checkFutureDate(new Date(), event)) {
      this.appointmentErrorFlag = 'Appointment date should not be in the past date';
    } else {
      this.appointmentErrorFlag = '';
      this.appointmentErrorFlag = '';
    }
  }
  /*  Access to Appointment form fields */
  get appointment() { return this.appointmentForm.controls; }

  /* get list */
  private getHospitalList(): void {
    this.spinner = true;
    this.api.getList(this.url.urlConfig().hospitals)
      .subscribe(hospital => {
        this.spinner = false;
        if (hospital) {
          this.hospitalList = hospital;
          console.log(hospital);
        }
      }, error => {
        this.spinner = false;
      });
  }
  /* Reset Action */
  public reset() {
    this.submitted = false;
    this.appointmentForm.reset();
  }
  ngOnInit() {
    this.createForm();
    this.getHospitalList();
  }

}

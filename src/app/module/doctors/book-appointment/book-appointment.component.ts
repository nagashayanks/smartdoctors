import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  spinner = false;
  appointmentList = [];
  gridColumns = [];
  pagination = true;
  sorting = true;
  pageLinks = 5;
  selectedRow: any;
  bookingFlag = false;
  appointmentForm: FormGroup;
  submitted = false;
  constructor(
    private api: Service,
    private url: UrlConfig,
    public common: CommonService,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  /* Appointment form controls creation */
  private createForm() {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      mobile: ['', Validators.required],
      emailId: ['',  [Validators.required, Validators.email]]
    });
  }

  /*  Access to book form fields */
  get book() { return this.appointmentForm.controls; }
  /* get list */
  private getHospitalList(id: number): void {
    this.spinner = true;
    this.generateGridColumn();
    const param = `${id}/availabilities`;
    this.api.getList(this.url.urlConfig().bookList.concat(param))
      .subscribe(hospital => {
        this.spinner = false;
        if (hospital) {
          this.appointmentList = hospital;
        }
      }, error => {
        this.spinner = false;
      });
  }

  /* configure the grid columns */
  private generateGridColumn(): void {
    this.gridColumns = [
      {
        colName: 'Hospital Name',
        rowName: 'hospitalName',
      }, {
        colName: 'Date',
        rowName: 'date',
      }, {
        colName: 'Slot Time',
        rowName: 'slotTime',
      },
      {
        colName: 'Balance',
        rowName: 'mobile',
      }, {
        colName: 'Action',
        action: [{ btnName: 'Book', btnClass: '' }]
      }
    ];

  }

  public getAction(event) {
    if (event.gridAction.btnName === 'Book') {
      this.selectedRow = event.val;
      this.bookingFlag = true;
    }
  }

  /* Modal Action
  @param Ok modal has been closed
 */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.spinner = false;
      this.common.alertConfigDefaultValue();
    } else if (action === 'Yes') {
      this.confirmAppointment();
    }
  }
  private confirmAppointment() {
    this.submitted = true;
    if (this.appointmentForm.valid) {
      this.spinner = true;
      const postObject = {
        doctorSlotId: this.selectedRow.doctorSlotId,
        patientName: this.appointmentForm.value.patientName,
        emailId: this.appointmentForm.value.emailId,
        mobile: this.appointmentForm.value.mobile,
      };
      /* Api call*/
      this.api.postCall(this.url.urlConfig().confirmBook, postObject, 'post').subscribe(appointment => {
        if (appointment.statusCode === 200) {
          this.spinner = false;
          this.common.alertConfig = this.common.modalConfig(
            'Error', appointment.message,
            true, [{ name: 'Ok' }]
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
  public cancel() {
    this.bookingFlag = false;
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.getHospitalList(params.id);
    });
    this.createForm();
  }

}

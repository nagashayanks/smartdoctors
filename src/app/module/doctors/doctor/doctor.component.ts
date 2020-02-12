import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { CommonService } from 'src/app/service/common-service';
import { BookedslotAppointments } from 'src/app/model/model';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  spinner = false;
  gridColumns = [];
  pagination = true;
  sorting = true;
  pageLinks = 5;
  bookedAppointmentDoctors: BookedslotAppointments[];
  constructor(
    private api: Service,
    private url: UrlConfig,
    private common: CommonService) { }

  ngOnInit() {
    this.getAppointmentListDoctor();
  }
 /* configure the grid columns */
 private generateGridColumn(): void {
  this.gridColumns = [
    {
      colName: 'To Account',
      rowName: 'hospitalName',
    }, {
      colName: 'Amount',
      rowName: 'date',
    }, {
      colName: 'Transaction Type',
      rowName: 'slotTime',
    }, {
      colName: 'Transaction Date',
      rowName: 'patientId',
    },
    {
      colName: 'Balance',
      rowName: 'patientName',
    },
    {
      colName: 'Balance',
      rowName: 'email',
    },
    {
      colName: 'Balance',
      rowName: 'mobile',
    }
  ];

}
private getAppointmentListDoctor() {
  this.generateGridColumn();
  this.spinner = true;
  // const params = `/${doctorId}/appointments`;
  /* Api call*/
  this.api.getList(this.url.urlConfig().appointments)
    .subscribe(doctorappointmentlist => {
      this.spinner = false;
      if (doctorappointmentlist) {
        this.bookedAppointmentDoctors = doctorappointmentlist;
      } else {
        this.common.alertConfig = this.common.modalConfig('Error', doctorappointmentlist.message, true, [{ name: 'Ok' }]);
      }
    },
    error => {
      this.spinner = false;
    });
}
}

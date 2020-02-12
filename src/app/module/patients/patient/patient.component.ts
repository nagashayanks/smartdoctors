import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { DoctorSummary } from 'src/app/model/model';
import { CommonService } from 'src/app/service/common-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  locations;
  spinner = false;
  submitted = false;
  transactionHistoryList: DoctorSummary[];
  gridColumns = [];
  pagination = true;
  sorting = true;
  pageLinks = 5;
  templist;
  searchName: string;
  selectedLocation: any;
  doctorId: number;
  doctorlist: any;

  constructor(
    private api: Service,
    private url: UrlConfig,
    private common: CommonService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getLocations();
    this.search();
  }

  /**
   * method to fetch all currency values for dropdown
   */
  getLocations = () => {
    console.log('locations');
    this.api.getList(this.url.urlConfig().locations).subscribe(order => {
      this.spinner = false;
      this.locations = order;
      console.log('list', order);
    }, error => {
      this.spinner = false;
    });
  }

  /* configure the grid columns */
  private generateGridColumn(): void {
    this.gridColumns = [
      {
        colName: 'Doctor Name',
        rowName: 'doctorName',
      }, {
        colName: 'Rating',
        rowName: 'rating',
      }, {
        colName: 'Specialization',
        rowName: 'specialization',
      }, {
        colName: 'Consultation Fees',
        rowName: 'consultationFee',
      },
      {
        colName: 'Action',
        action: [{ btnName: 'View', btnClass: 'padding' },
        { btnName: 'Book', btnClass: 'padding' }]
      }
    ];

  }
  public getAction(event) {
    this.doctorId = event.val.doctorId;
    if (event.gridAction.btnName === 'Book') {
      sessionStorage.setItem('doctorId', event.val.doctorId);
      this.router.navigate(['/patient/book-appointment']);
    } else if (event.gridAction.btnName === 'View') {
      this.getDoctordetails();
    } else {
      console.log(event.val.doctorId);
      this.getDoctordetails();
    }

  }

  /**
   * method to fetch all doctor details
   */
  public getDoctordetails() {
    const params = `/${this.doctorId}`;
    this.api.getList(this.url.urlConfig().doctors.concat(params)).subscribe(searchData => {
      this.doctorlist = searchData;

    });
  }

  private search() {
    const params = `/${this.selectedLocation ? this.selectedLocation.locationId : 0}/doctors?name=${this.searchName}`;
    console.log('name', params);
    this.submitted = true;
    this.generateGridColumn();
    this.spinner = true;
    this.api.getList(this.url.urlConfig().locations.concat(params)).subscribe(searchData => {
      this.spinner = false;
      this.transactionHistoryList = searchData;
      console.log('temp', this.transactionHistoryList);
    });

  }

  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.common.alertConfigDefaultValue();
    }
  }


}

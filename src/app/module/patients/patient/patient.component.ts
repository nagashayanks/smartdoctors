import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { DoctorSummary } from 'src/app/model/model';
import { CommonService } from 'src/app/service/common-service';

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
    private common: CommonService
  ) {
  }

  ngOnInit() {
    this.getLocations();
    this.getDoctorlist();
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
        rowName: 'consultationFees',
      },
      {
        colName: 'Action',
        action: [{ btnName: 'View', btnClass: 'padding' }]
      }
    ];

  }
  public getAction(event) {
    console.log(event.val.doctorId);
    this.getDoctordetails();
  }
  /*  Get Doctorlist history*/
  private getDoctorlist() {
    this.submitted = true;
    this.generateGridColumn();
    this.spinner = true;
    const account = sessionStorage.getItem('accountNumber');
    const params = `/${account}/transactions`;
    /* Api call*/
    this.api.getList(this.url.urlConfig().doctorHistory)
      .subscribe(summary => {
        this.spinner = false;
        if (summary) {
          this.transactionHistoryList = summary;
        } else {
          this.common.alertConfig = this.common.modalConfig('Error', summary.message, true, [{ name: 'Ok' }]);
        }
      },
        error => {
          this.spinner = false;
        });
  }
  /**
   * method to fetch all doctor details
   */
  private getDoctordetails() {
    const params = `/${this.doctorId}`;
    this.api.getList(this.url.urlConfig().doctors.concat(params)).subscribe(searchData => {
      this.doctorlist = searchData;

    });
  }

  private search() {
    const params = `/${this.selectedLocation.locationId}/doctors?name=${this.searchName}`;
    console.log('name', params);
    this.api.getList(this.url.urlConfig().locations.concat(params)).subscribe(searchData => {
      this.templist = searchData;

    });

  }

  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.common.alertConfigDefaultValue();
    }
  }


}

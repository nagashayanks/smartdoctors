import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = false;
    private apiHost = 'http://10.117.189.177:9090/housepital/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    /* url config with url Mock list */
    urlMock() {
        return this.url = {
            userLogin: 'http://10.117.189.111:9090/housepital/' + 'users',
            doctorHistory: this.apiMock + 'doctorList',
            locations: this.apiMock + 'locations',
            doctors: this.apiMock + 'accounts',
            appointments: this.apiMock + 'bookedAppointmentsDoctor',
            currencies: this.apiMock + 'users',
            hospitals: this.apiMock + 'accounts',
            appointment: this.apiMock + 'doctors/appointments',

        };
    }
    /* url config with url Server list */
    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'users',
            doctorHistory: this.apiHost + 'doctorList',
            locations: this.apiHost + 'locations',
            doctors: this.apiHost + 'doctors',
            appointments: this.apiMock + 'bookedAppointmentsDoctor',
            currencies: this.apiHost + 'currencies',
            hospitals: this.apiHost + 'hospitals/',
            appointment: this.apiMock + 'doctors/appointments'
        };
    }
    /* return url */
    urlConfig() {
        return this.serverConfig ? this.urlApi() : this.urlMock();
    }
}

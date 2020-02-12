import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = false;
    private apiHost = 'http://10.117.189.177:9090/forexpay/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    /* url config with url Mock list */
    urlMock() {
        return this.url = {
            userLogin: 'http://10.117.189.111:9090/forexpay/' + 'users',
            appointments: this.apiMock + 'bookedAppointmentsDoctor',
            currencies: this.apiMock + 'users',
            exchange: this.apiMock + 'users',
            transfer: this.apiMock + 'accounts/transactions',
            accounts: this.apiMock + 'accounts',

        };
    }
    /* url config with url Server list */
    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'users',
            appointments: this.apiMock + 'bookedAppointmentsDoctor',
            currencies: this.apiHost + 'currencies',
            exchange: this.apiHost + 'currencies/exchange',
            transfer: this.apiHost + 'accounts/transactions',
            accounts: this.apiHost + 'accounts/',
        };
    }
    /* return url */
    urlConfig() {
        return this.serverConfig ? this.urlApi() : this.urlMock();
    }
}

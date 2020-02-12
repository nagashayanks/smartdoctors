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
            exchange: this.apiMock + 'users',
            transfer: this.apiMock + 'accounts/transactions',
            accounts: this.apiMock + 'accounts',
            doctors: this.apiMock + 'accounts'
        };
    }
    /* url config with url Server list */
    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'users',
            doctorHistory: this.apiHost + 'doctorList',
            locations: this.apiHost + 'locations',
            exchange: this.apiHost + 'currencies/exchange',
            transfer: this.apiHost + 'accounts/transactions',
            accounts: this.apiHost + 'accounts/',
            doctors: this.apiHost + 'doctors'
        };
    }
    /* return url */
    urlConfig() {
        return this.serverConfig ? this.urlApi() : this.urlMock();
    }
}

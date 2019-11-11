import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {environment} from '../../../environments/environment.prod';
import {SnotifyService} from 'ng-snotify';

@Injectable()
export class AuthService implements OnInit {

    private baseOrigin = environment.production ? environment.host : 'http://ang.nearist.loc/backend';
    private baseUrl = this.baseOrigin;

    constructor(private http: HttpClient, private router: Router, private snotifyService: SnotifyService) {
    }

    ngOnInit() {
    }

    getPath() {
        return this.baseOrigin;
    }

    getHeader(): HttpHeaders {
        return new HttpHeaders({'Content-Type': 'application/json'});
    }

    getHeaderAuth() {
        return new HttpHeaders({'Authorization': 'Bearer ' + this.getToken(), 'Content-Type': 'application/json'});
    }

    /**
     * @returns {string}
     */
    getToken(): string {
        if (localStorage.getItem('at')) {
            return localStorage.getItem('at');
        }
        return null;
    }

    /**
     * @returns {string}
     */
    checkCustomerVerification(): any {
        if (localStorage.getItem('unverified')) {
            this.router.navigate(['/change-password']);
        }
    }

    /**
     * @param loginData
     * @returns {any}
     */
    auth(loginData: Object): Observable<any> {
        return this.http.post(this.baseUrl + '/security/login', JSON.stringify(loginData), {headers: this.getHeader()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param signupData
     * @returns {any}
     */
    signup(signupData: Object): Observable<any> {
        return this.http.post(this.baseUrl + '/security/signup', JSON.stringify(signupData), {headers: this.getHeader()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param hash
     * @returns {Observable<any>}
     */
    getUserByHash(hash: string): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/user/hash/' + hash, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param forgotPasswordData
     * @returns {any}
     */
    forgotPassword(forgotPasswordData: Object): Observable<any> {
        return this.http.post(this.baseUrl + '/security/forgot-password', JSON.stringify(forgotPasswordData), {headers: this.getHeader()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param data
     * @returns {Observable<any>}
     */
    confirmPassword(data: Object): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/security/confirm-password', JSON.stringify(data), {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * Logout user
     */
    logout(): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/v1.0/security/logout', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    getUserList(type: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/user/list/' + type, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @returns {Observable<any>}
     */
    getUserById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/user/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    removeUser(id): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/v1.0/user/remove/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param userData
     * @returns {Observable<any>}
     */
    addUser(userData: any): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/user/add', userData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @param userData
     * @returns {Observable<any>}
     */
    editUser(id: number, userData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/user/edit/' + id, userData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @param userData
     * @returns {Observable<any>}
     */
    editProfile(id: number, userData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/user/edit-profile/' + id, userData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {Observable<any>}
     */
    getCountries(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/location/countries', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} countryId
     * @returns {Observable<any>}
     */
    getStates(countryId: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/location/countries/' + countryId + '/states', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} stateId
     * @param {number} countryId
     * @returns {Observable<any>}
     */
    getCities(countryId: number, stateId: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/location/countries/' + countryId + '/states/' + stateId + '/cities', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param userData
     * @returns {Observable<any>}
     */
    changePassword(userData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/security/change-password', userData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    getBitStreams(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/board_config/list', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    removeBitStream(id): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/v1.0/board_config/remove/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    getServerList(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/server' + '/list', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param serverData
     * @returns {Observable<any>}
     */
    addServer(serverData: any): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/server' + '/add', serverData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @param serverData
     * @returns {Observable<any>}
     */
    editServer(id: number, serverData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/server' + '/edit/' + id, serverData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    removeServer(id): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/v1.0/server' + '/remove/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @returns {Observable<any>}
     */
    getServerById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/server' + '/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {Observable<any>}
     */
    getServerStatus(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/server' + '/health/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @param {number} page
     * @param {number} limit
     * @returns {Observable<any>}
     */
    getServerTempLogsByServerId(id: number, page: number, limit: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/server' + '/temperature/logs/' + id + '?page=' + page + '&limit=' + limit, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @param {number} page
     * @param {number} limit
     * @returns {Observable<any>}
     */
    getCustomerLogs(page: number, limit: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/customer/logs/list' + '?page='+ page +'&limit=' + limit, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @returns {Observable<any>}
     */
    getServerTempById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/server' + '/temperature/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     *
     * @param {number} id
     * @param serverData
     * @returns {Observable<any>}
     */
    manageServerTemperature(id: number, serverData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/server' + '/temperature/manage/' + id, serverData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @param {number} start
     * @param {number} temp
     * @param {number} logType
     * @param {string} dateFilter
     * @returns {Observable<any>}
     */
    getServerLogs(id: number, start: number, logType: number, dateFilter: number, temp?: number): Observable<any> {
        if (!temp) {
            temp = 0;
        }

        return this.http.get(this.baseUrl + '/api/v1.0/server/logs/' + id + '/' + start + '/' + temp + '/' + dateFilter + '/' + logType, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     *
     * @param id
     * @param type
     * @returns {Observable<any>}
     */
    removeLogs(id, type): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/v1.0/server/logs/delete/' + id + '/' + type, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @returns {Observable<any>}
     */
    getServerPowerStatus(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/server/ipmi/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {Observable<any>}
     */
    getCustomerServers(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/customer/servers/list', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @param {number} status
     * @returns {Observable<any>}
     */
    manageServerPower(id: number, status: number): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/server' + '/ipmi/' + id + '/' + status, {}, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     *
     * @param bitStreamData
     * @returns {Observable<any>}
     */
    addBitStream(bitStreamData: any): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/board_config/add', bitStreamData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     *
     * @param {number} id
     * @param bitStreamData
     * @returns {Observable<any>}
     */
    editBitStream(id: number, bitStreamData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/board_config/edit/' + id, bitStreamData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @returns {Observable<any>}
     */
    getBitStreamById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/board_config/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     *
     * @param {number} id
     * @returns {Observable<any>}
     */
    downloadFile(id: number): Observable<any> {
// TODO: add AUTH if not exists
        const tokenValue = 'Bearer ' + this.getToken();
        const headers = new HttpHeaders({'Authorization': tokenValue});

        return this.http.get(this.baseUrl + '/api/v1.0/board_config/file/' + id, {
            headers: headers,
            responseType: 'blob'
        });
    }

    /**
     * Simulate file download for browser
     *
     * @param body
     * @param options
     * @param filename
     */
    createAndDownloadBlobFile(body, options, filename) {
        const blob = new Blob([body], options);
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);

                // simulate file download by click
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    /**
     * This function is used to convert and return size data by GB
     *
     * @param value
     * @returns {any}
     */
    fileSize(value) {
        let bytes = +value;
        let i = 0;

        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
            return '';
        }

        while (i <= 2) {
            bytes /= 1024;
            i++;
        }

        return +bytes.toFixed(2);
    }


    /**
     * @returns {Observable<any>}
     */
    getReservations(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/reservation/list', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param {number} id
     * @returns {Observable<any>}
     */
    getReservationById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/reservation/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {Observable<any>}
     */
    getListDataForSelection(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/reservation/select-data', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }


    /**
     *
     * @param reservationData
     * @returns {Observable<any>}
     */
    addReservation(reservationData: any): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/reservation/add', reservationData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     *
     * @param {number} id
     * @param reservationData
     * @returns {Observable<any>}
     */
    editReservation(id: number, reservationData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/reservation/edit/' + id, reservationData, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    removeReservation(id): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/v1.0/reservation/remove/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @returns {any}
     */
    getCalendarEvents(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/reservation/events', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    loadBitstream(id: number, form_data: any): Observable<any> {
        return this.http.post(
            this.baseUrl + '/api/v1.0/server/load-bitstream',
            {'id': id, 'board_config': form_data.boardConfiguration, 'board_data': form_data.board_data},
            {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    loadConfiguration(id): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/server/load-config', {'id': id}, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    getServerInfoById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/server/select-info/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    syncFtpUsers(category: number): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/server/sync-ftp-users', {'category': category}, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    resetUserPassword(id: number): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/security/reset-password/' + id, {},{headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    /**
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        if (error.status && error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
        }

        if (!error.status || (error.status && error.status !== 401 && error.status !== 200)) {
            this.snotifyService.error(error.error.message ? 'ERROR: ' + error.error.message : 'Unknown error occured!');
        }

        return throwError(error);
    }


    getBitstreamStatusList(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/bitstream_status/list', {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    getBitstreamStatus(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/v1.0/bitstream_status/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    addBitstreamStatus(data: any): Observable<any> {
        return this.http.post(this.baseUrl + '/api/v1.0/bitstream_status/add', data, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    editBitstreamStatus(id: number, data: any): Observable<any> {
        return this.http.put(this.baseUrl + '/api/v1.0/bitstream_status/edit/' + id, data, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    removeBitstreamStatus(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/v1.0/bitstream_status/remove/' + id, {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

    powerOnConfig(id: number, board_config: any): Observable<any> {
        return this.http.post(
            this.baseUrl + '/api/v1.0/server/power-on-config',
            {'id': id, 'board_config': board_config},
            {headers: this.getHeaderAuth()})
            .map((res: Response) => res)
            .catch(this.handleError.bind(this));
    }

}

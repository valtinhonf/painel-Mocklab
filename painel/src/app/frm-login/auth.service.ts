import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoggedData} from './LoggedData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedData?: LoggedData;

  @Output() loggedDataChange = new EventEmitter<LoggedData>();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<LoggedData>(`${environment.url_api}/auth`, {username, password})
  }

  saveNewUser(username: string, shortname: string, password: string): Observable<any> {
    return this.http.post<LoggedData>(`${environment.url_api}/newUser/`, {username, shortname, password})
  }

  storageLoggedData(loggedData: LoggedData) {
    this.loggedData = loggedData;
    localStorage.setItem('mlab_session', JSON.stringify(loggedData));
    localStorage.setItem('mlab_username', loggedData.username);
    localStorage.setItem('mlab_organizationShortName', loggedData.organizationShortName);
    localStorage.setItem('mlab_idPublicOrganization', loggedData.idPublicOrganization);
    localStorage.setItem('mlab_userShortName', loggedData.userShortName);
    localStorage.setItem('mlab_token', loggedData.token);
    localStorage.setItem('mlab_idPublicUser', loggedData.idPublicUser);
    localStorage.setItem("mlab_auth", "true");
    this.loggedDataChange.emit(this.loggedData);
  }

  retrieveLoggedData(): LoggedData|undefined {
    if (!this.loggedData) {
      this.recreateLoggedDataFromLocalStorage();
    }
    return this.loggedData;
  }

  private recreateLoggedDataFromLocalStorage() {
    if (localStorage.getItem('mlab_session')!=undefined) {
      this.loggedData = JSON.parse(localStorage.getItem('mlab_session') ?? "");
    } else return undefined
  }

  isLogged(): boolean {
    return this.retrieveLoggedData() != undefined;
  }

  loggout(){
    localStorage.removeItem('mlab_session');
    localStorage.removeItem('mlab_username');
    localStorage.removeItem('mlab_organizationShortName');
    localStorage.removeItem('mlab_idPublicOrganization');
    localStorage.removeItem('mlab_userShortName');
    localStorage.removeItem('mlab_token');
    localStorage.removeItem('mlab_idPublicUser');
    localStorage.removeItem("mlab_auth");
    this.loggedData = undefined;
  }

}

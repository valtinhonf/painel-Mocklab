import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Organization} from './Organization';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getOrganization(idOrganization: string): Observable<Organization> {
    return this.http.get<Organization>(`${environment.url_api}/organizations/${idOrganization}`);
  }

  saveOrganization(organization: Organization): Observable<any> {
    return this.http.put<Organization>(`${environment.url_api}/organizations/`, organization);
  }

  getUser(idUser: string): Observable<User> {
    return this.http.get<User>(`${environment.url_api}/user/${idUser}`);
  }

  saveUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.url_api}/user/`, user);
  }

  changeUsername(idUser: string, newUsername: string): Observable<User> {
    return this.http.get<User>(`${environment.url_api}/user/change/username/${idUser}/${newUsername}`);
  }
}

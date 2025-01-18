import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MockProject} from './MockProject';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor( private http: HttpClient ) {

  }

  findAllMocks(idOrganization: string, idPublicUser: string): Observable<MockProject[]> {
    return this.http.get<MockProject[]>(`${environment.url_api}/mock/byorganization/${idOrganization}/${idPublicUser}`)
  }
}

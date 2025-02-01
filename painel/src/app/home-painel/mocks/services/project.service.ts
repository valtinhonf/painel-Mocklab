import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewProject} from '../models/NewProject';
import {Project} from '../models/Project';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpClient ) {}

  save(newProject: NewProject) {
    return this.http.post<Project>(`${environment.url_api}/project/`, newProject)
  }

  getById(idProject: string) {
    return this.http.get<Project>(`${environment.url_api}/project/${idProject}`)
  }

  listAllProjectsByOrganization(idOrganization: string) {
    return this.http.get<Project[]>(`${environment.url_api}/project/byorganization/${idOrganization}`)
  }
}

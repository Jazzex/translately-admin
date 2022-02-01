import { Observable, of } from 'rxjs';

import { AppsController } from 'src/app/interfaces/appsController';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesController } from 'src/app/interfaces/pagesController';
import { RegisteredAppBaseModel, RegisteredAppModel } from 'src/app/models/_models.index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppsApiService implements AppsController {

  constructor(
    private _http: HttpClient
  ) { }

  getById(appId: number): Observable<RegisteredAppModel> {
    return this._http.get<RegisteredAppModel>(`${environment.apiUrl}Apps/${appId}`);
  }

  create(request: RegisteredAppBaseModel): Observable<any> {
    return of({});
  }

  patch(appId: number, request: { [key: string]: any }): Observable<any> {
    return of({});
  }

  getAll(): Observable<RegisteredAppModel[]> {
    return this._http.get<RegisteredAppModel[]>(`${environment.apiUrl}Apps`);
  }

  delete(appId: number): Observable<any> {
    return of({});
  }
}

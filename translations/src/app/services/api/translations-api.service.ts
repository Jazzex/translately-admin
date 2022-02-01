import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalCultureModel } from 'src/app/models/_models.index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationsApiService {

  constructor(
    private _http: HttpClient
  ) { }

  getAll(registeredAppId: number, cultureInfo: any): Observable<any> {
    return of([]);
  }

  getByPage(registeredAppId: number, cultureInfo: any, pageId: number): Observable<any> {
    return of([]);
  }

  getLocalCultures(): Observable<LocalCultureModel[]> {
    return this._http.get<LocalCultureModel[]>(`${environment.apiUrl}Translations/Languages`);
  }
}

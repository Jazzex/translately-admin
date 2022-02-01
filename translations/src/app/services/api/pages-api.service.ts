import { AppPageBaseModel, AppPageModel, TranslationItemBaseModel } from 'src/app/models/_models.index';
import { Observable, of } from 'rxjs';

import { AppsComponent } from 'src/app/pages/apps/apps.component';
import { AppsController } from 'src/app/interfaces/appsController';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesController } from 'src/app/interfaces/pagesController';
import { TranslationsController } from 'src/app/interfaces/_controllers.index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesApiService implements PagesController {

  constructor(
    private _http: HttpClient
  ) { }

  getById(appId: number): Observable<AppPageModel[]> {
    return this._http.get<AppPageModel[]>(`${environment.apiUrl}${appId}/Pages`);
  }

  getAllPages(): Observable<AppPageModel[]> {
    return this._http.get<AppPageModel[]>(`${environment.apiUrl}Pages`);
  }
  
  createPage(appId: number, request: AppPageBaseModel): Observable<any> {
    return this._http.post(`${environment.apiUrl}${appId}/Pages`, request)
  }

  patchPage(appId: number, pageId: number, request: { [key: string]: any }): Observable<any> {
    return of({});
  }

  deletePage(appId: number, pageId: number): Observable<any> {
    return this._http.delete(`${environment.apiUrl}${appId}/Pages/${pageId}`)
  }

  getPageById(appId: number, pageId: number): Observable<any> {
    return of({});
  }

  createItem(appId: number, pageId: number, request: TranslationItemBaseModel): Observable<any> {
    return this._http.post(`${environment.apiUrl}${appId}/Pages/${pageId}`, request);
  }

  getItemById(appId: number, pageId: number, itemId: number): Observable<any> {
    return of({});
  }

  deleteItem(appId: number, pageId: number, itemId: number): Observable<any> {
    return this._http.delete(`${environment.apiUrl}${appId}/Pages/${pageId}/${itemId}`);
  }

  patchItem(appId: number, pageId: number, itemId: number, request: { [key: string]: any }): Observable<any> {
    return this._http.patch(`${environment.apiUrl}${appId}/Pages/${pageId}/${itemId}`, request);
  }
}

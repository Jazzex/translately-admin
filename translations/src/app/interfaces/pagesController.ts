import { Observable } from 'rxjs';
import { AppPageBaseModel } from '../models/appPageBaseModel';
import { TranslationItemBaseModel } from '../models/translationItemBaseModel';

export abstract class PagesController {

  constructor() {}

  abstract getAllPages(appId: number): Observable<any>;

  abstract createPage(appId: number, request: AppPageBaseModel): Observable<any>;

  abstract patchPage(appId: number, pageId: number, request: { [key: string]: any }): Observable<any>;

  abstract deletePage(appId: number, pageId: number): Observable<any>;

  abstract getPageById(appId: number, pageId: number): Observable<any>;

  abstract createItem(appId: number, pageId: number, request: TranslationItemBaseModel): Observable<any>;

  abstract getItemById(appId: number, pageId: number, itemId: number): Observable<any>;

  abstract deleteItem(appId: number, pageId: number, itemId: number): Observable<any>;

  abstract patchItem(appId: number, pageId: number, itemId: number, request: { [key: string]: any }): Observable<any>;
}

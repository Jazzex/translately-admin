import {
  AppPageBaseModel,
  AppPageModel,
  LocalCultureModel,
  RegisteredAppModel,
  TranslationItemBaseModel,
  TranslationItemModel,
} from 'src/app/models/_models.index';
import { BehaviorSubject, Observable, Subject, forkJoin } from 'rxjs';
import {
  catchError,
  first,
  map,
  mergeMap,
  take,
  takeUntil,
} from 'rxjs/operators';

import { AppsApiService } from '../api/apps-api.service';
import { Auth0App } from 'src/app/models/auth0AppModel';
import { IdentityService } from '../api/identity.service';
import { Injectable } from '@angular/core';
import { PagesApiService } from '../api/pages-api.service';
import { PostTranslationItemModel } from 'src/app/models/translationItemModel';
import { TranslationsApiService } from '../api/translations-api.service';

export class AppTranslations {
  appId: number;
  translations: LocalCultureModel[];
  translationsComplete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  private onDestroy$ = new Subject<void>();

  private _apps: BehaviorSubject<RegisteredAppModel[]> = new BehaviorSubject<RegisteredAppModel[]>(null);
  public apps$: Observable<RegisteredAppModel[]> = this._apps.asObservable();

  private _app: BehaviorSubject<RegisteredAppModel> = new BehaviorSubject<RegisteredAppModel>(null);
  public app$: Observable<RegisteredAppModel> = this._app.asObservable();

  private _appLanguages: BehaviorSubject<LocalCultureModel[]> = new BehaviorSubject<LocalCultureModel[]>(null);
  public appLanguages$: Observable<LocalCultureModel[]> = this._appLanguages.asObservable();

  public curAppId;

  constructor(
    private appsApiService: AppsApiService,
    private pagesApiService: PagesApiService,
    private translationsApiService: TranslationsApiService
  ) {}

  getApps() {
    this.appsApiService
      .getAll()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((apps: RegisteredAppModel[]) => {
        console.log(apps);
        this._apps.next(apps);
      });
  }

  getLanguages() {
    return this.translationsApiService.getLocalCultures();
  }

  getAppById(appId: number) {
    forkJoin([
      this.appsApiService.getById(appId),
      this.pagesApiService.getById(appId),
      this.translationsApiService.getLocalCultures(),
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        ([app, pages, languages]: [
          RegisteredAppModel,
          AppPageModel[],
          LocalCultureModel[]
        ]) => {
          let appLanguages: LocalCultureModel[] = [];

          // Set the localCulture for each item
          pages.map((page) => {
            page.translationItems.map((item) => {
              const localCulture = languages.find(
                (l) => l.id === item.localCultureId
              );
              item.localCulture = localCulture;
              if (!appLanguages.some((al) => al.id === localCulture.id)) {
                appLanguages.push(localCulture);
              }
              return item;
            });
            return page;
          });

          app.appPages = pages;
          this._app.next(app);
          this._appLanguages.next(appLanguages);
          this.curAppId = app.id;
        }
      );
  }

  patchPageItems(
    appId: number,
    pageId: number,
    translationItems: Array<TranslationItemModel>
  ) {
    const requests = translationItems.map((i) => {
      return this.pagesApiService
        .patchItem(appId, pageId, i.id, i)
        .pipe(first());
    });
    return forkJoin(requests);
  }

  addPageItems(
    appId: number,
    pageId: number,
    addItems: Array<TranslationItemBaseModel>
  ) {
    const requests = addItems.map((i) => {
      return this.pagesApiService.createItem(appId, pageId, i).pipe(first());
    });
    return forkJoin(requests);
  }

  deletePageItems(appId: number, pageId: number, itemId: number) {
    return this.pagesApiService.deleteItem(appId, pageId, itemId);
  }

  createPage(appId: number, pageName: string) {
    let request: AppPageBaseModel = new AppPageBaseModel({ name: pageName });
    return this.pagesApiService.createPage(appId, request);
  }

  deletePage(appId: number, pageId: number) {
    return this.pagesApiService.deletePage(appId, pageId);
  }
}

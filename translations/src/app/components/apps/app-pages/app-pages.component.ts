import {
  AppPageModel,
  AppPageTranslationModel,
  LocalCultureModel,
  RegisteredAppModel,
  TranslationItemBaseModel,
  TranslationItemModel,
} from 'src/app/models/_models.index';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { AppsService } from 'src/app/services/apps/apps.service';
import { FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AddAppPageDialogComponent } from 'src/app/dialogs/apps/add-app-page-dialog/add-app-page-dialog.component';
import { RemoveAppPageDialogComponent } from 'src/app/dialogs/apps/remove-app-page-dialog/remove-app-page-dialog.component';
import { AddAppLanguageDialogComponent } from 'src/app/dialogs/apps/add-app-language-dialog/add-app-language-dialog.component';
import { ArrayHelpers } from 'src/app/helpers/ArrayHelpers';

@Component({
  selector: 'app-app-pages',
  templateUrl: './app-pages.component.html',
  styleUrls: ['./app-pages.component.scss'],
})
export class AppPagesComponent implements OnInit, OnDestroy {
  appId: number;
  app: RegisteredAppModel;
  appPages: AppPageModel[];
  selectedLanguageId = 0;
  appLanguages: Array<LocalCultureModel>;
  itemKeyFormControl = new FormControl();
  itemValueFormControl = new FormControl();
  addCount = 0;
  private onDestroy$ = new Subject<void>();

  constructor(
    private appsService: AppsService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        console.log(res);
        this.appId = res.id;
        this.subToApp();
        this.subToAppLanguages();
        if (
          !this.appsService.curAppId ||
          this.appsService.curAppId != this.appId
        ) {
          this.appsService.getAppById(this.appId);
        }
      });

  }

  subToApp() {
    this.appsService.app$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((registeredApp: RegisteredAppModel) => {
        if (registeredApp && registeredApp.id == this.appId) {
          registeredApp.appPagesObj = ArrayHelpers.arrayToObject(
            registeredApp.appPages,
            'id'
          );
          registeredApp.appPages.forEach((page) => {
            let itemsObj = ArrayHelpers.arrayToObject(page.translationItems, 'id');
            registeredApp.appPagesObj[page.id].itemsObj = itemsObj;
          });
          console.log(registeredApp.appPages, registeredApp.appPagesObj);
          this.app = JSON.parse(JSON.stringify(registeredApp));
        }
      });
  }

  subToAppLanguages() {
    this.appsService.appLanguages$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((appLanguages: LocalCultureModel[]) => {
        if (appLanguages) {
          this.appLanguages = appLanguages;
        }
      });
  }

  onChangeInput(event, pageId, item, inputName) {
    console.log('onChangeInput', event, pageId, item, inputName)
    if (item.status != 'default') {
      const origPage = this.app.appPages.find((p) => p.id == pageId);
      const origItem = origPage.translationItems.find((i) => i.id == item.id);
      item.status = origItem[inputName] == event ? 'success' : 'warning';
    }
  }

  ngOnDestroy() { 
    this.onDestroy$.next();
  }

  filterItems(items: TranslationItemModel[], lang: LocalCultureModel) {
    if (this.selectedLanguageId != 0 && lang.id != this.selectedLanguageId) {
      return [];
    }
    return items.filter((i) => i.localCultureId == lang.id);
  }

  save() {
    // Process the working objects to get the added and changed items
    Object.keys(this.app.appPagesObj).forEach((pageId) => {
      let appPage: AppPageModel = this.app.appPages.find(
        (ap) => ap.id == parseInt(pageId)
      );
      let updateItems: TranslationItemModel[] = [];
      let addItems: TranslationItemBaseModel[] = [];
      Object.keys(this.app.appPagesObj[pageId].itemsObj).forEach((itemId) => {
        // Find Changed Items
        let item = this.app.appPagesObj[pageId].itemsObj[itemId];
        let pageItem = appPage.translationItems.find(
          (i) => i.id == parseInt(itemId)
        );
        if (pageItem && pageItem.status && pageItem.status != 'success') {
          // Set the Key, Value from the object array
          pageItem.itemKey = item.itemKey;
          pageItem.itemValue = item.itemValue;
          updateItems.push(pageItem);
        }

        // Add New Items
        if (!pageItem) {
          addItems.push({
            itemKey: item.itemKey,
            itemValue: item.itemValue,
            localCultureId: item.localCultureId,
          });
        }
      });

      console.log(addItems, updateItems);

      if (updateItems.length) {
        this.appsService
          .patchPageItems(appPage.registeredAppId, appPage.id, updateItems)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((res) => {
            this.appsService.getAppById(this.appId);
          });
      }

      if (addItems.length) {
        this.appsService
          .addPageItems(appPage.registeredAppId, appPage.id, addItems)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((res) => {
            this.appsService.getAppById(this.appId);
            this.addCount = 0;
          });
      }
    });
  }

  removeItem(event, appPage: AppPageModel, item) {
    if (item.id.toString().includes('new_')) {
      appPage.translationItems = appPage.translationItems.filter(
        (ti) => ti.id != item.id
      );
      delete this.app.appPagesObj[appPage.id].itemsObj[item.id];
    } else {
      this.appsService
        .deletePageItems(appPage.registeredAppId, appPage.id, item.id)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((res) => {
          this.appsService.getAppById(this.appId);
        });
    }
  }

  addItem(event, appPage) {
    this.addCount += 1;
    let newItem = {
      id: 'new_' + this.addCount,
      itemKey: '',
      itemValue: '',
      localCultureId: this.selectedLanguageId,
      status: 'default'
    };
    appPage.translationItems.push(newItem);
    this.app.appPagesObj[appPage.id].itemsObj[newItem.id] = newItem;
  }

  addPageDialog() {
    const dialogRef = this.dialogService.open(AddAppPageDialogComponent, {dialogClass: 'app-dialog'});
    dialogRef.onClose.subscribe((add: boolean) => {
      if (add) {
        this.appsService.getAppById(this.appId);
      }
    });
  }

  addAppLanguage() {
    const dialogRef = this.dialogService.open(AddAppLanguageDialogComponent);

    dialogRef.onClose.subscribe((selectedLanguage) => {
      if (selectedLanguage && this.appLanguages.findIndex(al => al.id == selectedLanguage.id) == -1) {
        this.appLanguages.push(selectedLanguage);
      }
    });
  }

  removePageDialog() {
    const dialogRef = this.dialogService.open(RemoveAppPageDialogComponent, {
      context: {
        appId: this.appId,
        appPages: this.app.appPages,
      },
    });

    dialogRef.onClose.subscribe((add: boolean) => {
      if (add) {
        this.appsService.getAppById(this.appId);
      }
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalCultureModel } from 'src/app/models/localCultureModel';
import { AppsService } from 'src/app/services/apps/apps.service';

@Component({
  selector: 'app-add-app-language-dialog',
  templateUrl: './add-app-language-dialog.component.html',
  styleUrls: ['./add-app-language-dialog.component.scss']
})
export class AddAppLanguageDialogComponent implements OnInit, OnDestroy {

  selectedLanguage;
  languages: LocalCultureModel[];
  private onDestroy$ = new Subject<void>();

  constructor(
    protected dialogRef: NbDialogRef<AddAppLanguageDialogComponent>,
    public appsService: AppsService
  ) { }

  ngOnInit(): void {
    this.subToAppLanguages();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  close() {}

  addLanguage() {
    this.dialogRef.close(this.selectedLanguage);
  }

  subToAppLanguages() {
    this.appsService.getLanguages()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((languages: LocalCultureModel[]) => {
        if (languages) {
          this.languages = languages;
        }
      });
  }

}

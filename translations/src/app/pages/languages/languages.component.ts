import { Component, OnInit } from '@angular/core';
import { LocalCultureModel } from 'src/app/models/localCultureModel';
import { AppsService } from 'src/app/services/apps/apps.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  languages: LocalCultureModel[];

  constructor(public appsService: AppsService) { }

  ngOnInit(): void {
    this.getTranslations();
  }

  getTranslations() {
    this.appsService.getLanguages().subscribe(res => {
      this.languages = res;
    })
  }

}

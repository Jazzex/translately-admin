import './models/_models.index';
import './interfaces/_controllers.index';

import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbListModule,
  NbDialogModule,
  NbSearchModule
} from '@nebular/theme';

import { AppComponent } from './app.component';
import { AppPagesComponent } from './components/apps/app-pages/app-pages.component';
import { AppRoutingModule } from './app-routing.module';
import { AppsCardComponent } from './components/apps/apps-card/apps-card.component';
import { AppsComponent } from './pages/apps/apps.component';
import { AppsListComponent } from './components/apps/apps-list/apps-list.component';
import { AppsService } from './services/apps/apps.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LanguagesComponent } from './pages/languages/languages.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { RemoveAppPageDialogComponent } from './dialogs/apps/remove-app-page-dialog/remove-app-page-dialog.component';
import { AddAppPageDialogComponent } from './dialogs/apps/add-app-page-dialog/add-app-page-dialog.component';
import { AddAppLanguageDialogComponent } from './dialogs/apps/add-app-language-dialog/add-app-language-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AppPagesComponent,
    AppsComponent,
    LanguagesComponent,
    AppsListComponent,
    AddAppPageDialogComponent,
    RemoveAppPageDialogComponent,
    AppsCardComponent,
    AppPagesComponent,
    AddAppLanguageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbCardModule,
    NbAccordionModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbIconModule,
    NbListModule,
    NbDialogModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [AppsService],
  bootstrap: [AppComponent],
})
export class AppModule {}

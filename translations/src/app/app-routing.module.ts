import { RouterModule, Routes } from '@angular/router';

import { AppPagesComponent } from './components/apps/app-pages/app-pages.component';
import { AppsComponent } from './pages/apps/apps.component';
import { NgModule } from '@angular/core';
import { LanguagesComponent } from './pages/languages/languages.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'apps' },
  { path: 'apps', component: AppsComponent},
  { path: 'apps/:id', component: AppPagesComponent},
  { path: 'languages', component: LanguagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

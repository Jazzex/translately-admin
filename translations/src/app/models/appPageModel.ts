import { RegisteredAppModel } from './registeredAppModel';
import { TranslationItemModel } from './translationItemModel';

export class AppPageModel {
  id: number;
  registeredAppId: number;
  createdOn: string;
  registeredApp: RegisteredAppModel;
  translationItems: TranslationItemModel[];
  name: string;

  constructor(obj: Partial<AppPageModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

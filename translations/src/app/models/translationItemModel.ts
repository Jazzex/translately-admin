import { AppPageModel } from './appPageModel';
import { LocalCultureModel } from './localCultureModel';
import { RegisteredAppModel } from './registeredAppModel';

export class TranslationItemModel {
  id: number;
  registeredAppId: number;
  appPageId: number;
  createdOn: string;
  appPage: AppPageModel;
  localCulture: LocalCultureModel;
  registeredApp: RegisteredAppModel;
  localCultureId: number;
  itemKey: string;
  itemValue: string;

  // added
  status = null;

  constructor(obj: Partial<TranslationItemModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

export class PostTranslationItemModel {
  localCultureId: number;
  itemKey: string;
  itemValue: string;
}
import { AppPageModel } from './appPageModel';
import { TranslationItemModel } from './translationItemModel';

export class RegisteredAppModel {
  id: number;
  createdOn: string;
  appPages: AppPageModel[];
  translationItems: TranslationItemModel[];
  name: string;

  // added
  appPagesObj;

  constructor(obj: Partial<RegisteredAppModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

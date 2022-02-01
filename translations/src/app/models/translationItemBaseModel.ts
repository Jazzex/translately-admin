

export class TranslationItemBaseModel {
  localCultureId: number;
  itemKey: string;
  itemValue: string;

  constructor(obj: Partial<TranslationItemBaseModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

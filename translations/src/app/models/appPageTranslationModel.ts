

export class AppPageTranslationModel {
  pageName: string;
  items: { [key: string]: string };

  constructor(obj: Partial<AppPageTranslationModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

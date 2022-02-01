

export class LocalCultureBaseModel {
  culture: string;
  language: string;

  constructor(obj: Partial<LocalCultureBaseModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

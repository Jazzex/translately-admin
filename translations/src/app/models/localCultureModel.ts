

export class LocalCultureModel {
  id: number;
  createdOn: string;
  culture: string;
  language: string;

  constructor(obj: Partial<LocalCultureModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

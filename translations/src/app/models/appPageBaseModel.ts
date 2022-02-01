

export class AppPageBaseModel {
  name: string;

  constructor(obj: Partial<AppPageBaseModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

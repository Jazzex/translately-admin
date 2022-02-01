

export class RegisteredAppBaseModel {
  name: string;

  constructor(obj: Partial<RegisteredAppBaseModel>) {
    for (const property in obj) {
      this[property] = obj[property];
    }
  }
}

export class Auth0App {
    name: string;
    clientId: string;
    description: string;

    constructor(obj: Partial<Auth0App>) {
        for (const property in obj) {
          this[property] = obj[property];
        }
      }
}
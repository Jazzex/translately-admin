import { Observable } from 'rxjs';


export abstract class TranslationsController {

  protected route(): string{
    return `translations`;
  }

  constructor() {}

  abstract getAll(registeredAppId: number, cultureInfo: any): Observable<any>;

  abstract getByPage(registeredAppId: number, cultureInfo: any, pageId: number): Observable<any>;

  abstract getLocalCultures(): Observable<any>;
}

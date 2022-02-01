import { Observable } from 'rxjs';
import { RegisteredAppBaseModel } from '../models/registeredAppBaseModel';

export abstract class AppsController {

  constructor() {}

  abstract getById(appId: number): Observable<any>;

  abstract create(request: RegisteredAppBaseModel): Observable<any>;

  abstract patch(appId: number, request: { [key: string]: any }): Observable<any>;

  abstract getAll(): Observable<any>;

  abstract delete(appId: number): Observable<any>;
}

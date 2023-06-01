import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Scrapbook } from '../dataaccess/scrapbook';

@Injectable({
  providedIn: 'root'
})
export class ScrapbookService {

  readonly backendUrl = 'scrapbook';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Scrapbook[]> {
    return this.http.get<Scrapbook[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Scrapbook> {
    return this.http.get<Scrapbook>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(scrapbook: Scrapbook): Observable<Scrapbook> {
    return this.http.put<Scrapbook>(environment.backendBaseUrl + this.backendUrl + `/${scrapbook.id}`, scrapbook);
  }

  public save(scrapbook: Scrapbook): Observable<Scrapbook> {
    return this.http.post<Scrapbook>(environment.backendBaseUrl + this.backendUrl, scrapbook);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}

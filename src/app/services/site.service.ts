import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Site } from "../dataaccess/site";

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  readonly backendUrl = 'site';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Site[]> {
    return this.http.get<Site[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Site> {
    return this.http.get<Site>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(site: Site): Observable<Site> {
    return this.http.put<Site>(environment.backendBaseUrl + this.backendUrl + `/${site.id}`, site);
  }

  public save(site: Site): Observable<Site> {
    return this.http.post<Site>(environment.backendBaseUrl + this.backendUrl, site);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}

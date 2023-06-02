import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Rating } from "../dataaccess/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  readonly backendUrl = 'rating';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Rating[]> {
    return this.http.get<Rating[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Rating> {
    return this.http.get<Rating>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(environment.backendBaseUrl + this.backendUrl + `/${rating.id}`, rating);
  }

  public save(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(environment.backendBaseUrl + this.backendUrl, rating);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}

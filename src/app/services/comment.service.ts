import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comment } from "../dataaccess/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly backendUrl = 'comment';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Comment> {
    return this.http.get<Comment>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(environment.backendBaseUrl + this.backendUrl + `/${comment.id}`, comment);
  }

  public save(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(environment.backendBaseUrl + this.backendUrl, comment);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}

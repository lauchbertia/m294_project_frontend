import { BehaviorSubject, Observable } from "rxjs";

export class HeaderService {

  private pageSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly pageObservable: Observable<string> = this.pageSubject.asObservable();

  public setPage(page: string) {
    this.pageSubject.next(page);
  }
}

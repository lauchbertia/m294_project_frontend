import { Scrapbook } from "./scrapbook";

export class Site {
  public id!: number;
  public title = '';
  public content = '';
  public scrapbook = new Scrapbook();
  public scrapbookId = -1;
}

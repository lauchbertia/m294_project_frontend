import { Scrapbook } from "./scrapbook";

export class Rating {
  public id!: number;
  public stars = 0;
  public scrapbook = new Scrapbook();
  public scrapbookId = -1;
}

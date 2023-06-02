//import {Comment} from './comment';

import { Site } from "./site";


export class Comment {
  public id!: number;
  public content = '';
  public site = new Site();
  public siteId = -1;

}

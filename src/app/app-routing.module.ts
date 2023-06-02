import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContentCommentsComponent } from './components/content-comments/content-comments.component';
import { ContentSitesComponent } from './components/content-sites/content-sites.component';
import { ContentRatingsComponent } from './components/content-ratings/content-ratings.component';
import { ListScrapbookComponent } from './components/list-scrapbook/list-scrapbook.component';
import { ContentScrapbookComponent } from './components/content-scrapbook/content-scrapbook.component';
import { ListCommentComponent } from './components/list-comments/list-comment.component';
import { ListSitesComponent } from './components/list-sites/list-sites.component';
import { ListRatingsComponent } from './components/list-ratings/list-ratings.component';


const routes: Routes = [
  { path: 'nav', component: NavComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'scrapbooks', component: ListScrapbookComponent},
  { path: 'scrapbook/:id', component: ContentScrapbookComponent, pathMatch: 'full'},
  { path: 'scrapbook', component:  ContentScrapbookComponent, pathMatch: 'full'},
  { path: 'sites', component: ListSitesComponent},
  { path: 'site/:id', component: ContentSitesComponent, pathMatch: 'full'},
  { path: 'site', component: ContentSitesComponent, pathMatch: 'full'},
  { path: 'comments', component: ListCommentComponent},
  { path: 'comment/:id', component: ContentCommentsComponent, pathMatch: 'full'},
  { path: 'comment', component: ContentCommentsComponent, pathMatch: 'full'},
  { path: 'ratings', component: ListRatingsComponent},
  { path: 'rating/:id', component: ContentRatingsComponent},
  { path: 'rating', component: ContentRatingsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

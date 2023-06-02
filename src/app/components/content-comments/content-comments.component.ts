import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/dataaccess/comment';
import { Site } from 'src/app/dataaccess/site';
import { CommentService } from 'src/app/services/comment.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-content-comments',
  templateUrl: './content-comments.component.html',
  styleUrls: ['./content-comments.component.scss']
})
export class ContentCommentsComponent  implements OnInit {

  site = new Site();
  public sites: Site[] = [];



  comment = new Comment();
  public objForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    content: new UntypedFormControl(''),
    siteId: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private commentService: CommentService, public siteService: SiteService) {}

  ngOnInit(): void {

    this.siteService.getList().subscribe(o => {
      this.sites = o;
    });

    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.commentService.getOne(id).subscribe(obj => {
        this.comment = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.comment);
    }
  }

  async back() {
    await this.router.navigate(['comments']);
  }

  async save(formData: any) {
    this.comment = Object.assign(formData);
    this.comment.site = this.sites.find(o => o.id === formData.scrapbookId) as Site;

    if (this.comment.id) {
      this.commentService.update(this.comment).subscribe({
        next: () => {
          this.snackBar.open('Comment saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save comment', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.commentService.save(this.comment).subscribe({
        next: () => {
          this.snackBar.open('New comment saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new comment', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Comment } from 'src/app/dataaccess/comment';
import { CommentService } from 'src/app/services/comment.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit, AfterViewInit {
  CommentDataSource = new MatTableDataSource<Comment>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'content', 'site', 'actions'];

  public constructor(private commentService: CommentService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar) {
}

  comment = new Comment();
  public objForm = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    content: new UntypedFormControl(''),
    site: new UntypedFormControl('')
  });

  async ngOnInit() {
    await this.reloadData();
  }

  async back() {
    await this.router.navigate(['comments']);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.CommentDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.commentService.getList().subscribe(obj => {
      this.CommentDataSource.data = obj;
    });
  }

  async edit(e: Comment) {
    await this.router.navigate(['comments', e.id]);
  }

  async add() {
    await this.router.navigate(['comments']);
  }

  delete(e: Comment) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete comment?',
        message: 'Do you really want to delete the selected scrapbook?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.commentService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Comment deleted!"', 'Close', {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000});
            }
          },
          error: () => this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000})
        });
      }
    });
  }

  async save(formData: any) {
    this.comment = Object.assign(formData);

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

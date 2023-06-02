import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/dataaccess/rating';

@Component({
  selector: 'app-list-ratings',
  templateUrl: './list-ratings.component.html',
  styleUrls: ['./list-ratings.component.scss']
})
export class ListRatingsComponent implements OnInit, AfterViewInit {
  RatingDataSource = new MatTableDataSource<Rating>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'scrapbook', 'stars', 'actions'];

  public constructor(private ratingService: RatingService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar) {
}

rating = new Rating();
  public objForm = new UntypedFormGroup({
    rating: new UntypedFormControl(''),
    scrapbook: new UntypedFormControl('')
  });

  async ngOnInit() {
    await this.reloadData();
  }

  async back() {
    await this.router.navigate(['ratings']);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.RatingDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.ratingService.getList().subscribe(obj => {
      this.RatingDataSource.data = obj;
    });
  }

  async edit(e: Rating) {
    await this.router.navigate(['rating', e.id]);
  }

  async add() {
    await this.router.navigate(['rating']);
  }

  delete(e: Rating) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete scrapbook?',
        message: 'Do you really want to delete the selected scrapbook?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.ratingService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Rating deleted!"', 'Close', {duration: 5000});
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
    this.rating = Object.assign(formData);

    if (this.rating.id) {
      this.ratingService.update(this.rating).subscribe({
        next: () => {
          this.snackBar.open('Rating saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save rating', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.ratingService.save(this.rating).subscribe({
        next: () => {
          this.snackBar.open('New rating saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new ratingk', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}

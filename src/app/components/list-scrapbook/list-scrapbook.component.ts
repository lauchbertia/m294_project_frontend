import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from 'rxjs';

import { Scrapbook } from 'src/app/dataaccess/scrapbook';
import { ScrapbookService } from 'src/app/services/content-scrapbook.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-scrapbook',
  templateUrl: './list-scrapbook.component.html',
  styleUrls: ['./list-scrapbook.component.scss']
})
export class ListScrapbookComponent implements OnInit, AfterViewInit {
  ScrapbookDataSource = new MatTableDataSource<Scrapbook>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'title', 'rating', 'actions'];

  public constructor(private scrapbookService: ScrapbookService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar) {
}

  scrapbook = new Scrapbook();
  public objForm = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    rating: new UntypedFormControl('')
  });

  async ngOnInit() {
    await this.reloadData();
  }

  async back() {
    await this.router.navigate(['scrapbook']);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.ScrapbookDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.scrapbookService.getList().subscribe(obj => {
      this.ScrapbookDataSource.data = obj;
    });
  }

  async edit(e: Scrapbook) {
    await this.router.navigate(['scrapbook', e.id]);
  }

  async add() {
    await this.router.navigate(['scrapbook']);
  }

  delete(e: Scrapbook) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete scrapbook?',
        message: 'Do you really want to delete the selected scrapbook?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.scrapbookService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Scrapbook deleted!"', 'Close', {duration: 5000});
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
    this.scrapbook = Object.assign(formData);

    if (this.scrapbook.id) {
      this.scrapbookService.update(this.scrapbook).subscribe({
        next: () => {
          this.snackBar.open('Scrapbook saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save scrapbook', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.scrapbookService.save(this.scrapbook).subscribe({
        next: () => {
          this.snackBar.open('New scrapbook saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new scrapbook', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}




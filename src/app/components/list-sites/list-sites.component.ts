import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Site } from 'src/app/dataaccess/site';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-list-sites',
  templateUrl: './list-sites.component.html',
  styleUrls: ['./list-sites.component.scss']
})
export class ListSitesComponent implements OnInit, AfterViewInit {
  SiteDataSource = new MatTableDataSource<Site>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'title', 'content', 'comment', 'scrapbook', 'actions'];

  public constructor(private siteService: SiteService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar) {
}

  site = new Site();
  public objForm = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    content: new UntypedFormControl(''),
    scrapbook: new UntypedFormControl(''),
    comment: new UntypedFormControl('')
  });

  async ngOnInit() {
    await this.reloadData();
  }

  async back() {
    await this.router.navigate(['sites']);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.SiteDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.siteService.getList().subscribe(obj => {
      this.SiteDataSource.data = obj;
    });
  }

  async edit(e: Site) {
    await this.router.navigate(['site', e.id]);
  }

  async add() {
    await this.router.navigate(['site']);
  }

  delete(e: Site) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete site?',
        message: 'Do you really want to delete the selected site?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.siteService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Site deleted!"', 'Close', {duration: 5000});
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
    this.site = Object.assign(formData);

    if (this.site.id) {
      this.siteService.update(this.site).subscribe({
        next: () => {
          this.snackBar.open('Site saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save site', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.siteService.save(this.site).subscribe({
        next: () => {
          this.snackBar.open('New site saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new site', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}



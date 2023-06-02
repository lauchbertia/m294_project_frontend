import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Scrapbook } from 'src/app/dataaccess/scrapbook';
import { ScrapbookService } from 'src/app/services/content-scrapbook.service';

@Component({
  selector: 'app-content-scrapbook',
  templateUrl: './content-scrapbook.component.html',
  styleUrls: ['./content-scrapbook.component.scss']
})
export class ContentScrapbookComponent implements OnInit{

  scrapbook = new Scrapbook();
  public objForm = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    rating: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private scrapbookService: ScrapbookService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.scrapbookService.getOne(id).subscribe(obj => {
        this.scrapbook = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.scrapbook);
    }
  }

  async back() {
    await this.router.navigate(['scrapbooks']);
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


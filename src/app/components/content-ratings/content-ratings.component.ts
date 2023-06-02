import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Rating } from 'src/app/dataaccess/rating';
import { Scrapbook } from 'src/app/dataaccess/scrapbook';
import { ScrapbookService } from 'src/app/services/content-scrapbook.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-content-ratings',
  templateUrl: './content-ratings.component.html',
  styleUrls: ['./content-ratings.component.scss']
})
export class ContentRatingsComponent implements OnInit{

  scrapbook = new Scrapbook();
  public scrapbooks: Scrapbook[] = [];

  rating = new Rating();
  public objForm = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    stars: new UntypedFormControl(''),
    scrapbookId: new UntypedFormControl(''),
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private ratingService: RatingService, public scrapbookService: ScrapbookService) {}

  ngOnInit(): void {

    this.scrapbookService.getList().subscribe(o => {
      this.scrapbooks = o;
    });

    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.ratingService.getOne(id).subscribe(obj => {
        this.rating = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.rating);
    }
  }

  async back() {
    await this.router.navigate(['ratings']);
  }

  async save(formData: any) {
    this.rating = Object.assign(formData);
    this.rating.scrapbook = this.scrapbooks.find(o => o.id === formData.scrapbookId) as Scrapbook;


    if (this.rating.id) {
      this.ratingService.update(this.rating).subscribe({
        next: () => {
          this.snackBar.open('Stars saved', 'Close', {duration: 5000});
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
          this.snackBar.open('Failed to save new rating', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}


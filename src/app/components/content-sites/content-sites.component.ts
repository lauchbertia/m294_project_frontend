import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Scrapbook } from 'src/app/dataaccess/scrapbook';
import { Site } from 'src/app/dataaccess/site';
import { ScrapbookService } from 'src/app/services/content-scrapbook.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-content-sites',
  templateUrl: './content-sites.component.html',
  styleUrls: ['./content-sites.component.scss']
})
export class ContentSitesComponent implements OnInit {

  scrapbook = new Scrapbook();
  public scrapbooks: Scrapbook[] = [];


  site = new Site();
  public objForm = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    content: new UntypedFormControl(''),
    scrapbookId: new UntypedFormControl(''),
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private siteService: SiteService, private scrapbookService: ScrapbookService) {}

  ngOnInit(): void {

    this.scrapbookService.getList().subscribe(o => {
      this.scrapbooks = o;
    });

    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.siteService.getOne(id).subscribe(obj => {
        this.site = obj;
        this.objForm = this.formBuilder.group(obj);
        this.objForm.addControl('scrapbookId', new UntypedFormControl(obj.scrapbook.id));

      });
    } else {
      this.objForm = this.formBuilder.group(this.site);
    }
  }

  async back() {
    await this.router.navigate(['sites']);
  }

  async save(formData: any) {
    this.site = Object.assign(formData);

    this.site.scrapbook = this.scrapbooks.find(o => o.id === formData.scrapbookId) as Scrapbook;

    if (this.site.id) {
      this.siteService.update(this.site).subscribe({
        next: () => {
          this.snackBar.open('site saved', 'Close', {duration: 5000});
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

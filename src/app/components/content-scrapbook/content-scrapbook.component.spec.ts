import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentScrapbookComponent } from './content-scrapbook.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('ContentScrapbookComponent', () => {
  let component: ContentScrapbookComponent;
  let fixture: ComponentFixture<ContentScrapbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatSelectModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatDialogModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule
      ],
      declarations: [ContentScrapbookComponent]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentScrapbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentScrapbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

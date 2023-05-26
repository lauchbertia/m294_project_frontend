import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentScrapbookComponent } from './content-scrapbook.component';

describe('ContentScrapbookComponent', () => {
  let component: ContentScrapbookComponent;
  let fixture: ComponentFixture<ContentScrapbookComponent>;

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

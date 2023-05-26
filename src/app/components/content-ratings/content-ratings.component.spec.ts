import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRatingsComponent } from './content-ratings.component';

describe('ContentRatingsComponent', () => {
  let component: ContentRatingsComponent;
  let fixture: ComponentFixture<ContentRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentRatingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

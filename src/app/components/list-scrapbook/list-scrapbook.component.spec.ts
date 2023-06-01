import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScrapbookComponent } from './list-scrapbook.component';

describe('ListScrapbookComponent', () => {
  let component: ListScrapbookComponent;
  let fixture: ComponentFixture<ListScrapbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScrapbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListScrapbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

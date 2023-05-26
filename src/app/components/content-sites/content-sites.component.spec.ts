import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSitesComponent } from './content-sites.component';

describe('ContentSitesComponent', () => {
  let component: ContentSitesComponent;
  let fixture: ComponentFixture<ContentSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

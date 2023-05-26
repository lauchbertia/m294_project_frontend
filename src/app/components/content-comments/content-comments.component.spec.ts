import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCommentsComponent } from './content-comments.component';

describe('ContentCommentsComponent', () => {
  let component: ContentCommentsComponent;
  let fixture: ComponentFixture<ContentCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

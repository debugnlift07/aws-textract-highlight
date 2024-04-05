import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedImageComponent } from './highlighted-image.component';

describe('HighlightedImageComponent', () => {
  let component: HighlightedImageComponent;
  let fixture: ComponentFixture<HighlightedImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightedImageComponent]
    });
    fixture = TestBed.createComponent(HighlightedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

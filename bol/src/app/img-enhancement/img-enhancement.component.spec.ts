import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgEnhancementComponent } from './img-enhancement.component';

describe('ImgEnhancementComponent', () => {
  let component: ImgEnhancementComponent;
  let fixture: ComponentFixture<ImgEnhancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgEnhancementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgEnhancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

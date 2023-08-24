import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhukienComponent } from './phukien.component';

describe('PhukienComponent', () => {
  let component: PhukienComponent;
  let fixture: ComponentFixture<PhukienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhukienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhukienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

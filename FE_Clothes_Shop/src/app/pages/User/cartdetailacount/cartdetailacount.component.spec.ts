import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdetailacountComponent } from './cartdetailacount.component';

describe('CartdetailacountComponent', () => {
  let component: CartdetailacountComponent;
  let fixture: ComponentFixture<CartdetailacountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartdetailacountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdetailacountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSanphamComponent } from './all-sanpham.component';

describe('AllSanphamComponent', () => {
  let component: AllSanphamComponent;
  let fixture: ComponentFixture<AllSanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsanphamComponent } from './addsanpham.component';

describe('AddsanphamComponent', () => {
  let component: AddsanphamComponent;
  let fixture: ComponentFixture<AddsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

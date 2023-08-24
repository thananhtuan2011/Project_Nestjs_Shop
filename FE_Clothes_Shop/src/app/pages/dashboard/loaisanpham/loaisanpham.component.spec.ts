import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaisanphamComponent } from './loaisanpham.component';

describe('LoaisanphamComponent', () => {
  let component: LoaisanphamComponent;
  let fixture: ComponentFixture<LoaisanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaisanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

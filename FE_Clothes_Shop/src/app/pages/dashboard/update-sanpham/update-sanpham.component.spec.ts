import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSanphamComponent } from './update-sanpham.component';

describe('UpdateSanphamComponent', () => {
  let component: UpdateSanphamComponent;
  let fixture: ComponentFixture<UpdateSanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

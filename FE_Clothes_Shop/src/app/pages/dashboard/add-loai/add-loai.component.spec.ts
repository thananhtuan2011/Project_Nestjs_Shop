import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoaiComponent } from './add-loai.component';

describe('AddLoaiComponent', () => {
  let component: AddLoaiComponent;
  let fixture: ComponentFixture<AddLoaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

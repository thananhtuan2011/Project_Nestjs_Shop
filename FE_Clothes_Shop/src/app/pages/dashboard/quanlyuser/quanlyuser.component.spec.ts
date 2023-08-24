import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyuserComponent } from './quanlyuser.component';

describe('QuanlyuserComponent', () => {
  let component: QuanlyuserComponent;
  let fixture: ComponentFixture<QuanlyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

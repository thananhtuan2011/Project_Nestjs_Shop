import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesanphamcartComponent } from './updatesanphamcart.component';

describe('UpdatesanphamcartComponent', () => {
  let component: UpdatesanphamcartComponent;
  let fixture: ComponentFixture<UpdatesanphamcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesanphamcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesanphamcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

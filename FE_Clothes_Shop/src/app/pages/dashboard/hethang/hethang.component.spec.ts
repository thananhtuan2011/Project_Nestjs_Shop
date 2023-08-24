import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HethangComponent } from './hethang.component';

describe('HethangComponent', () => {
  let component: HethangComponent;
  let fixture: ComponentFixture<HethangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HethangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HethangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

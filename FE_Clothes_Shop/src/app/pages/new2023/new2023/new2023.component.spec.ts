import { ComponentFixture, TestBed } from '@angular/core/testing';

import { New2023Component } from './new2023.component';

describe('New2023Component', () => {
  let component: New2023Component;
  let fixture: ComponentFixture<New2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ New2023Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(New2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

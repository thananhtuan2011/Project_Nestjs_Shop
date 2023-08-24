import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterolseComponent } from './updaterolse.component';

describe('UpdaterolseComponent', () => {
  let component: UpdaterolseComponent;
  let fixture: ComponentFixture<UpdaterolseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdaterolseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdaterolseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

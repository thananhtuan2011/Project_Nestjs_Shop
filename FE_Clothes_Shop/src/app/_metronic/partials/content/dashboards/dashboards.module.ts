import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';

@NgModule({
  declarations: [Dashboard1Component, DashboardWrapperComponent],
  imports: [CommonModule],
  exports: [DashboardWrapperComponent],
})
export class DashboardsModule { }

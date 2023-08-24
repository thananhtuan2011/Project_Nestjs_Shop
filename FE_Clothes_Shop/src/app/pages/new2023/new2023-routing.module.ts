import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { New2023Component } from './new2023/new2023.component';

const routes: Routes = [
  {
    path: "", component: New2023Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class New2023RoutingModule { }

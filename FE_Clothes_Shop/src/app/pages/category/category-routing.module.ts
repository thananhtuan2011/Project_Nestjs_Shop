import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { PhukienComponent } from './phukien/phukien.component';

const routes: Routes = [
  {
    path: ':id/:type',
    component: ProductCategoryComponent,
  },
  {
    path: 'Phukien/:idsub/:type',
    component: PhukienComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }

import { LayoutUtilsService } from './../../modules/auth/crud/utils/layout-utils.service';
import { CRUDTableModule } from './../../_metronic/shared/crud-table/crud-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { PhukienComponent } from './phukien/phukien.component';


@NgModule({
  declarations: [ProductCategoryComponent, PhukienComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CommonModule,
    CRUDTableModule,
    MatIconModule,
    NgbModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [LayoutUtilsService]
})
export class CategoryModule { }

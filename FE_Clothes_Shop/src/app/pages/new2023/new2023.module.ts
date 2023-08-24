import { LayoutUtilsService } from './../../modules/auth/crud/utils/layout-utils.service';
import { CRUDTableModule } from './../../_metronic/shared/crud-table/crud-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { New2023RoutingModule } from './new2023-routing.module';
import { ProductService } from '../User/services/product.service';
import { New2023Component } from './new2023/new2023.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [New2023Component],
  imports: [
    CommonModule,
    New2023RoutingModule,
    CRUDTableModule,
    MatIconModule,
    NgbModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [ProductService, LayoutUtilsService]

})
export class New2023Module { }

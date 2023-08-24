import { LayoutUtilsService } from './../../modules/auth/crud/utils/layout-utils.service';
import { CRUDTableModule } from './../../_metronic/shared/crud-table/crud-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import { DonHangComponent } from './don-hang/don-hang.component';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { XacNhanComponent } from './xac-nhan/xac-nhan.component';
import { MatRadioModule } from '@angular/material/radio';
import { QuanlyuserComponent } from './quanlyuser/quanlyuser.component';
import { UpdaterolseComponent } from './updaterolse/updaterolse.component';
import { LoaisanphamComponent } from './loaisanpham/loaisanpham.component';
import { TonkhoComponent } from './tonkho/tonkho.component';
import { MatSelectModule } from '@angular/material/select';
import { AddLoaiComponent } from './add-loai/add-loai.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AllSanphamComponent } from './all-sanpham/all-sanpham.component';
import { AddsanphamComponent } from './addsanpham/addsanpham.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { UpdateSanphamComponent } from './update-sanpham/update-sanpham.component';
import { BanchayComponent } from './banchay/banchay.component';
import { HethangComponent } from './hethang/hethang.component';
import { UserComponent } from './user/user.component';
import { DoanhthuComponent } from './doanhthu/doanhthu.component';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DashboardComponent, DonHangComponent, XacNhanComponent, QuanlyuserComponent, UpdaterolseComponent, LoaisanphamComponent, TonkhoComponent, AddLoaiComponent, AllSanphamComponent, AddsanphamComponent, UpdatecategoryComponent, UpdateSanphamComponent, BanchayComponent, HethangComponent, UserComponent, DoanhthuComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'DonHang',
        component: DonHangComponent,
      },
      {
        path: 'Acount',
        component: QuanlyuserComponent,
      },
      {
        path: 'Category',
        component: LoaisanphamComponent,
      },
      {
        path: 'TonKho',
        component: TonkhoComponent,
      },
      {
        path: 'Product',
        component: AllSanphamComponent,
      },
      {
        path: 'HetHang',
        component: HethangComponent,
      },
      {
        path: 'Best',
        component: BanchayComponent,
      },
      {
        path: 'User',
        component: UserComponent,
      },
      {
        path: 'Doanhthu',
        component: DoanhthuComponent,
      },






    ]),
    DashboardsModule,
    CRUDTableModule,
    MatIconModule,
    NgbModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    AvatarModule,
    MatSnackBarModule,
    FormsModule,
    MatTableModule,
    NgxChartsModule
  ],
  entryComponents: [XacNhanComponent, UpdaterolseComponent],
  providers: [LayoutUtilsService]
})
export class DashboardModule { }

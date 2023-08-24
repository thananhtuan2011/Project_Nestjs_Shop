import { DeleteEntityDialogComponent } from './../../modules/auth/crud/delete-entity-dialog/delete-entity-dialog.component';
import { LayoutUtilsService } from './../../modules/auth/crud/utils/layout-utils.service';
import { CRUDTableModule } from './../../_metronic/shared/crud-table/crud-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AvatarModule } from 'ngx-avatar';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { BaseComponent } from './components/base/base.component';
import { AllProductComponent } from './shop/all-product/all-product.component';
import { FindByImageComponent } from './components/find-by-image/find-by-image.component';
import { BlogComponent } from './blog/blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { New2023Component } from '../new2023/new2023/new2023.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatChipsModule } from '@angular/material/chips';
import { TopbarService } from '../_layout/components/topbar/topbar.service';
import { MatSelectModule } from '@angular/material/select';
import { DetailCartComponent } from './detail-cart/detail-cart.component';
import { ThanhToanComponent } from './thanh-toan/thanh-toan.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { CartdetailacountComponent } from './cartdetailacount/cartdetailacount.component';
import { MatMenuModule } from '@angular/material/menu';
import { UpdatesanphamcartComponent } from './updatesanphamcart/updatesanphamcart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [UserComponent,
    FooterComponent,
    HomeComponent,
    DeleteEntityDialogComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProfileDetailsComponent,
    EditAddressComponent,
    BaseComponent,
    AllProductComponent,
    FindByImageComponent,
    BlogComponent,
    ProductHomeComponent,
    ProductAllComponent,
    ProductDetailComponent,
    DetailCartComponent,
    ThanhToanComponent,
    CartdetailacountComponent,
    UpdatesanphamcartComponent,
    // New2023Component,
  ],
  entryComponents: [DeleteEntityDialogComponent]
  ,
  imports: [
    CRUDTableModule,
    MatChipsModule,
    CommonModule,
    MatButtonModule,
    PerfectScrollbarModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    FormsModule,
    MatIconModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    AvatarModule,
    MatSnackBarModule,
    SlickCarouselModule,
    MatDialogModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  providers: [
    ToastrService,
    LayoutUtilsService,
    TopbarService
  ],
})
export class UserModule { }

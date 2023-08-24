import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AllProductComponent } from './shop/all-product/all-product.component';
import { FindByImageComponent } from './components/find-by-image/find-by-image.component';
import { BlogComponent } from './blog/blog.component';
import { UserComponent } from './user.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCategoryComponent } from '../category/product-category/product-category.component';
import { DetailCartComponent } from './detail-cart/detail-cart.component';
import { ThanhToanComponent } from './thanh-toan/thanh-toan.component';
import { CartComponent } from './cart/cart.component';
import { CartdetailacountComponent } from './cartdetailacount/cartdetailacount.component';

const routes: Routes = [{
  path: "", component: UserComponent,
  children: [
    {
      path: '',
      component: HomeComponent,
      children: [
        {
          path: '',
          component: ProductHomeComponent,
        },
        {
          path: 'All',
          component: ProductAllComponent,
        },
        {
          path: 'Cart',
          component: CartComponent,
        },
        {
          path: 'GioHang',
          component: CartdetailacountComponent,
        },

        {
          path: 'Pay',
          component: ThanhToanComponent,
        },


        // {
        //   path: 'New2023',
        //   component: New2023Component,
        // },

        {
          path: 'Product/:id_product',
          component: ProductDetailComponent,
        },
        {
          path: 'CartDetail/:IdDonHang',
          component: DetailCartComponent,
        }



      ]

    },
  ]
},
{ path: "checkout", component: CheckoutComponent },
{ path: "shop", component: ShopComponent },
{ path: "dashboard", component: DashboardComponent },
// { path: "login", component: LoginComponent },
{ path: "signup", component: SignupComponent },
{ path: "forgot-password", component: ForgotPasswordComponent },
{ path: "profile-details", component: ProfileDetailsComponent },
{ path: "edit-address", component: EditAddressComponent },
{ path: "all-product", component: AllProductComponent },
{ path: "find-by-image", component: FindByImageComponent },
{ path: "blog", component: BlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'Home',
        loadChildren: () =>
          import('./User/user.module').then((m) => m.UserModule),
      },
      {
        path: 'New2023',
        loadChildren: () =>
          import('./new2023/new2023.module').then((m) => m.New2023Module),
      },
      {
        path: 'CateGory',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },


      {
        path: 'Infor',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },

      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },


      {
        path: '',
        redirectTo: '/Home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }

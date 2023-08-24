import { ProductService } from './../../../User/services/product.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../_metronic/core';
import { AuthService } from '../../../../modules/auth/_services/auth.service';
import { UserModel } from '../../../../modules/auth/_models/user.model';
import KTLayoutQuickSearch from '../../../../../assets/js/layout/extended/quick-search';
import KTLayoutQuickNotifications from '../../../../../assets/js/layout/extended/quick-notifications';
import KTLayoutQuickActions from '../../../../../assets/js/layout/extended/quick-actions';
import KTLayoutQuickCartPanel from '../../../../../assets/js/layout/extended/quick-cart';
import KTLayoutQuickPanel from '../../../../../assets/js/layout/extended/quick-panel';
import KTLayoutQuickUser from '../../../../../assets/js/layout/extended/quick-user';
import KTLayoutHeaderTopbar from '../../../../../assets/js/layout/base/header-topbar';
import { KTUtil } from '../../../../../assets/js/components/util';
import { TopbarService } from './topbar.service';
import { NotifyService } from 'src/app/_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, AfterViewInit {
  user$: Observable<UserModel>;
  countorder: number;
  // tobbar extras
  extraSearchDisplay: boolean;
  extrasSearchLayout: 'offcanvas' | 'dropdown';
  extrasNotificationsDisplay: boolean;
  extrasNotificationsLayout: 'offcanvas' | 'dropdown';
  extrasQuickActionsDisplay: boolean;
  extrasQuickActionsLayout: 'offcanvas' | 'dropdown';
  extrasCartDisplay: boolean;
  extrasCartLayout: 'offcanvas' | 'dropdown';
  extrasQuickPanelDisplay: boolean;
  extrasLanguagesDisplay: boolean;
  extrasUserDisplay: boolean;
  extrasUserLayout: 'offcanvas' | 'dropdown';
  User: any
  slthongbao: any;
  listOrder: any[] = [];
  constructor(private layout: LayoutService, private notyfi: NotifyService, private auth: AuthService, private product: ProductService, private topbar_services: TopbarService, private changeDetectorRefs: ChangeDetectorRef) {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
  }

  GetCountCart() {
    if (this.User) {

      this.topbar_services.GetCountCart(this.User[0].account_id).subscribe((res: any) => {
        if (res) {
          this.countorder = res.data.count;
          this.changeDetectorRefs.detectChanges();
        }
      })
    }

  }
  addSl(id) {

  }
  thanhtoan() {
    // this.tongtien = '0';
  }
  tien: number = 0;
  tongtien: number;
  GetCartByAcount() {
    if (this.User) {

      this.topbar_services.GetCartByAcount(this.User[0].account_id).subscribe((res: any) => {
        this.tongtien = 0
        this.tien = 0
        this.listOrder = res.data;
        this.listOrder.forEach(element => {
          this.tien = this.tien + Number.parseInt(element.DonGia) * element.soluong
        })

        this.tongtien = (this.tien);
        if (this.listOrder.length == 0) {
          this.tongtien = 0
          this.tien = 0
        }
        this.changeDetectorRefs.detectChanges();
      })
    }

  }
  Eventcount() {
    this.product.RecountCart$.subscribe((res: any) => {
      if (res == true) {
        this.GetCountCart();
        this.GetCartByAcount();
      }
    })
  }

  extrasCartDropdownStyle: 'light' | 'dark' = 'light';

  GetDSNotify() {
    if (this.User) {

      this.topbar_services.GetDonHangXacNhanByAcount(this.User[0].account_id).subscribe((res: any) => {
        if (res) {
          this.slthongbao = res.data.length;
          console.log(" this.slthongbao", this.slthongbao)
          this.changeDetectorRefs.detectChanges();
        }
      })
    }

  }
  EventXacNhan() {
    this.notyfi.xacnhan.subscribe((res: any) => {
      if (res == this.User[0].account_id) {
        this.GetDSNotify()
      }

    })
  }
  EventLoad() {
    this.notyfi.thanhtoan.subscribe(res => {
      if (res) {
        this.GetDSNotify();
      }
    })
  }
  ngOnInit(): void {
    this.EventXacNhan();
    this.extrasCartDropdownStyle = this.layout.getProp(
      'extras.cart.dropdown.style'
    );
    this.GetCartByAcount();
    // topbar extras
    this.EventLoad();
    this.GetDSNotify();
    this.GetCountCart();
    this.Eventcount();
    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
    this.extraSearchDisplay = this.layout.getProp('extras.search.display');
    this.extrasSearchLayout = this.layout.getProp('extras.search.layout');
    this.extrasNotificationsDisplay = this.layout.getProp(
      'extras.notifications.display'
    );
    this.extrasNotificationsLayout = this.layout.getProp(
      'extras.notifications.layout'
    );
    this.extrasQuickActionsDisplay = this.layout.getProp(
      'extras.quickActions.display'
    );
    this.extrasQuickActionsLayout = this.layout.getProp(
      'extras.quickActions.layout'
    );
    this.extrasCartDisplay = this.layout.getProp('extras.cart.display');
    this.extrasCartLayout = this.layout.getProp('extras.cart.layout');
    this.extrasLanguagesDisplay = this.layout.getProp(
      'extras.languages.display'
    );
    this.extrasUserDisplay = this.layout.getProp('extras.user.display');
    this.extrasUserLayout = this.layout.getProp('extras.user.layout');
    this.extrasQuickPanelDisplay = this.layout.getProp(
      'extras.quickPanel.display'
    );
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      if (this.extraSearchDisplay && this.extrasSearchLayout === 'offcanvas') {
        KTLayoutQuickSearch.init('kt_quick_search');
      }

      if (
        this.extrasNotificationsDisplay &&
        this.extrasNotificationsLayout === 'offcanvas'
      ) {
        // Init Quick Notifications Offcanvas Panel
        KTLayoutQuickNotifications.init('kt_quick_notifications');
      }

      if (
        this.extrasQuickActionsDisplay &&
        this.extrasQuickActionsLayout === 'offcanvas'
      ) {
        // Init Quick Actions Offcanvas Panel
        KTLayoutQuickActions.init('kt_quick_actions');
      }

      if (this.extrasCartDisplay && this.extrasCartLayout === 'offcanvas') {
        // Init Quick Cart Panel
        KTLayoutQuickCartPanel.init('kt_quick_cart');
      }

      if (this.extrasQuickPanelDisplay) {
        // Init Quick Offcanvas Panel
        KTLayoutQuickPanel.init('kt_quick_panel');
      }

      if (this.extrasUserDisplay && this.extrasUserLayout === 'offcanvas') {
        // Init Quick User Panel
        KTLayoutQuickUser.init('kt_quick_user');
      }

      // Init Header Topbar For Mobile Mode
      KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
    });
  }
}

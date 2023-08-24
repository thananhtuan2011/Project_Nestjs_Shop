import { MessageType } from './../../../../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { NotifyService } from './notify.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutUtilsService } from 'src/app/modules/auth/crud/utils/layout-utils.service';

@Component({
  selector: 'app-quick-panel-offcanvas',
  templateUrl: './quick-panel-offcanvas.component.html',
  styleUrls: ['./quick-panel-offcanvas.component.scss'],
})
export class QuickPanelOffcanvasComponent implements OnInit {
  extrasQuickPanelOffcanvasDirectionCSSClass = 'offcanvas-right';
  User: any;
  activeTabId:
    | 'kt_quick_panel_logs'
    | 'kt_quick_panel_notifications'
    | 'kt_quick_panel_settings' = 'kt_quick_panel_logs';

  constructor(private layoutUtilsService: LayoutUtilsService, private layout: LayoutService, private notyfi: NotifyService, private changeDetectorRefs: ChangeDetectorRef) {
    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
  }

  listNotify: any[] = [];
  listVanChuyen: any[] = [];
  listXacNhan: any[] = [];
  GetDSNotify() {
    if (this.User) {

      this.notyfi.GetDonHangXacNhanByAcount(this.User[0].account_id).subscribe((res: any) => {
        if (res) {
          this.listNotify = res.data;
          console.log(" this.listNotify", this.listNotify)
          this.changeDetectorRefs.detectChanges();
        }
      })
    }



  }
  GetDSNotifyVanchuyen() {
    if (this.User) {

      this.notyfi.GetDonHangXacNhanByAcountDangVanChuyen(this.User[0].account_id).subscribe((res: any) => {
        if (res) {
          this.listVanChuyen = res.data;
          this.changeDetectorRefs.detectChanges();
        }
      })
    }



  }
  GetDSNotifyXacNhan() {
    if (this.User) {

      this.notyfi.GetDonHangChoXacNhan(this.User[0].account_id).subscribe((res: any) => {
        if (res) {
          this.listXacNhan = res.data;
          this.changeDetectorRefs.detectChanges();
        }
      })
    }



  }
  EventLoad() {
    this.notyfi.thanhtoan.subscribe(res => {
      if (res) {
        this.GetDSNotify();
        this.GetDSNotifyVanchuyen();
        this.GetDSNotifyXacNhan()
      }
    })
  }
  EventDonHang() {
    this.notyfi.thanhtoan.subscribe((res: any) => {
      console.log("res", res)
      if (res.account_id != this.User[0].account_id && this.User[0].role_code == "1") {
        this.GetDSNotify()
        this.GetDSNotifyVanchuyen();
        this.GetDSNotifyXacNhan()
        this.layoutUtilsService.showActionNotification(res.full_name + " đã thanh toán đơn hàng", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      }

    })
  }
  EventXacNhan() {
    this.notyfi.xacnhan.subscribe((res: any) => {
      console.log("res xac nhãn", res)
      if (res == this.User[0].account_id) {
        this.GetDSNotify()
        this.GetDSNotifyVanchuyen();
        this.GetDSNotifyXacNhan()
        this.layoutUtilsService.showActionNotification("Đơn hàng của bạn đã được xác nhận", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      }

    })
  }
  showSuccess() {

  }
  ngOnInit(): void {
    this.EventDonHang();
    this.EventXacNhan()
    this.GetDSNotify()
    this.EventLoad();
    this.GetDSNotifyVanchuyen();
    this.GetDSNotifyXacNhan()
    this.extrasQuickPanelOffcanvasDirectionCSSClass = `offcanvas-${this.layout.getProp(
      'extras.quickPanel.offcanvas.direction'
    )}`;
  }

  setActiveTabId(tabId) {
    this.activeTabId = tabId;
  }

  getActiveCSSClasses(tabId) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active show';
  }
}

import { NotifyService } from 'src/app/_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutService } from './../../../_metronic/core/services/layout.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { TopbarService } from '../../_layout/components/topbar/topbar.service';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { UpdatesanphamcartComponent } from '../updatesanphamcart/updatesanphamcart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cartdetailacount',
  templateUrl: './cartdetailacount.component.html',
  styleUrls: ['./cartdetailacount.component.scss']
})
export class CartdetailacountComponent implements OnInit {
  countorder: any
  User: any
  slthongbao: any;
  listOrder: any[] = [];
  constructor(private dialog: MatDialog, private order_services: OrderService, private layout: LayoutService, private layoutUtilsService: LayoutUtilsService, private notyfi: NotifyService, private auth: AuthService, private product: ProductService, private topbar_services: TopbarService, private changeDetectorRefs: ChangeDetectorRef) {
    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
  }
  UpdateSp(item) {

    const dialogRef = this.dialog.open(UpdatesanphamcartComponent, {
      width: '500px',
      data: { item },
      // height: '600px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.ngOnInit()
        this.changeDetectorRefs.detectChanges();
      }
    })

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
  XoaSPGioHang(id) {
    this.order_services.RemoveSpOrder(id).subscribe((res: any) => {
      if (res) {
        this.GetCartByAcount();
        // this.notyfi.xacnhan.next(true);
        // this.notyfi.thanhtoan.next(true)
        this.product.RecountCart$.next(true);
        this.layoutUtilsService.showActionNotification("Thay đổi thông tin thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);

      }
    })
  }

  tien: number = 0;
  tongtien: number = 0;
  GetCartByAcount() {
    if (this.User) {

      this.topbar_services.GetCartByAcount(this.User[0].account_id).subscribe((res: any) => {
        this.tongtien = 0
        this.tien = 0
        this.listOrder = res.data;
        console.log(" this.listOrder ", this.listOrder)
        this.listOrder.forEach(element => {
          this.tien = this.tien + Number.parseInt(element.DonGia) * element.soluong
        })

        this.tongtien = (this.tien)

        if (this.listOrder.length == 0) {
          this.tongtien = 0;
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
  ngOnInit(): void {
    this.GetCartByAcount();
  }
  GetDSNotify() {
    if (this.User) {

      this.topbar_services.GetDonHangXacNhanByAcount(this.User[0].account_id).subscribe((res: any) => {
        if (res) {
          this.slthongbao = res.data.length;
          this.changeDetectorRefs.detectChanges();
        }
      })
    }

  }


}

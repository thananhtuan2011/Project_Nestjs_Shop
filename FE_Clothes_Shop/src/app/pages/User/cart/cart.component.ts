import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../services/product.service';
import { TopbarService } from '../../_layout/components/topbar/topbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  listOrder: any[] = []
  User: any;
  hoten: string;
  diachi: string;
  sdt: string;
  email: string;

  constructor(private notify: NotifyService, private route: ActivatedRoute, private router: Router, private order_services: OrderService, private layoutUtilsService: LayoutUtilsService, private translate: TranslateService, private product: ProductService, private topbar_services: TopbarService, private changeDetectorRefs: ChangeDetectorRef) {

    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
  }
  tien: number = 0;
  tongtien: string;
  GetDonHangXacNhanByAcountDetail() {
    this.order_services.GetDonHangXacNhanByAcountDetail(this.User[0].account_id).subscribe((res: any) => {
      this.listOrder = res.data;
      console.log(" this.listOrder", this.listOrder)

      this.changeDetectorRefs.detectChanges();
    })
  }
  // this.hoten = this.User[0].full_name
  // this.email = this.User[0].email
  // this.diachi = this.User[0].address
  // this.sdt = this.User[0].phone

  CreatedPay() {
    // const _title = this.translate.instant('Thanh toán');
    // const _description = this.translate.instant('Bạn có muốn thanh toán không ?');
    // const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
    // const _deleteMessage = this.translate.instant('Thanh toán đơn hàng thành công !');
    // const _erroMessage = this.translate.instant('Thất bại !');
    // const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    // dialogRef.afterClosed().subscribe((res) => {
    //   if (!res) {
    //     return;
    //   }
    //   else {
    //     // let item = this.ItemDonHang();
    //     this.order_services.InsertDonHang(item, this.User[0].account_id).subscribe((res: any) => {
    //       console.log("resss", res)
    //       if (res && res.status == 1) {
    //         this.product.RecountCart$.next(true);
    //         this.GetCartByAcount();
    //         this.notify.sendThanhToan(item);
    //         this.router.navigate(['/Home']);
    //         this.layoutUtilsService.showActionNotification("Thanh toán thành Công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);


    //       }
    //     })
    //   }


    // });
  }
  RemoveOrder(order_id) {
    const _title = this.translate.instant('Xóa sản phẩm');
    const _description = this.translate.instant('Bạn có muốn xóa không ?');
    const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
    const _deleteMessage = this.translate.instant('Xóa thành công!');
    const _erroMessage = this.translate.instant('Thất bại !');
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      else {
        this.order_services.RemoveOrder(order_id).subscribe((res: any) => {
          if (res) {
            this.product.RecountCart$.next(true);
            this.GetDonHangXacNhanByAcountDetail();
            this.layoutUtilsService.showActionNotification("Thành Công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);

          }
        })

      }


    });
  }

  ngOnInit(): void {


    this.GetDonHangXacNhanByAcountDetail();


  }


}

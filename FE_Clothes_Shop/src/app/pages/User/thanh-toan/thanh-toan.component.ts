import { MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { TranslateService } from '@ngx-translate/core';
import { TopbarService } from '../../_layout/components/topbar/topbar.service';
import { ProductService } from '../services/product.service';
import { LayoutService } from './../../../_metronic/core/services/layout.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutUtilsService } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { OrderService } from '../services/order.service';
import { DonHangModel } from '../models/Donghang.model';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.scss']
})
export class ThanhToanComponent implements OnInit {
  listOrder: any[] = []
  maxacnhan: string;
  isKeyXaNhan: boolean = false;
  User: any;
  phisip: number = 0
  ship: string;
  hoten: string;
  diachi: string;
  sdt: string;
  email: string;
  registrationForm: FormGroup;
  hasError: boolean;
  IdDonHang: number;
  isLoading$: Observable<boolean>;
  constructor(private fb: FormBuilder, private notify: NotifyService, private router: Router, private order_services: OrderService, private layoutUtilsService: LayoutUtilsService, private translate: TranslateService, private product: ProductService, private topbar_services: TopbarService, private changeDetectorRefs: ChangeDetectorRef) {

    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
  }
  tien: number = 0;
  tongtien: string;
  GetCartByAcount() {
    this.topbar_services.GetCartByAcount(this.User[0].account_id).subscribe((res: any) => {
      this.tien = 0;
      this.listOrder = res.data;
      console.log(" this.listOrder", this.listOrder)
      this.listOrder.forEach(element => {
        this.tien = this.tien + Number.parseInt(element.DonGia) * element.soluong
      })
      if ((this.tien * 1000) > 500000) {
        this.phisip = 0;

        this.tongtien = ((this.tien).toLocaleString('vi', { style: 'currency', currency: 'VND' }));

      }
      else {
        if (this.listOrder.length > 0) {
          this.phisip = 50000;
          this.ship = ((this.phisip).toLocaleString('vi', { style: 'currency', currency: 'VND' }));
        }
        this.tongtien = (((this.tien) + this.phisip).toLocaleString('vi', { style: 'currency', currency: 'VND' }));

      }

      this.changeDetectorRefs.detectChanges();
    })
  }
  SubmitXacNhan() {
    this.order_services.SubmitXacNhan(Number.parseInt(this.IdDonHang.toString()), Number.parseInt(this.maxacnhan.toString())).subscribe((res: any) => {
      if (res && res.status == 1) {
        this.notify.thanhtoan.next(true)
        this.router.navigate(['/Home/All']);

        this.layoutUtilsService.showActionNotification("Xác nhận thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      }
      else {
        this.layoutUtilsService.showActionNotification("Mã xác nhận không hợp lệ", MessageType.Delete, 4000, true, false, 3000, 'top', 0);

      }
    })
  }
  // this.hoten = this.User[0].full_name
  // this.email = this.User[0].email
  // this.diachi = this.User[0].address
  // this.sdt = this.User[0].phone
  ItemDonHang(): DonHangModel {

    const item = new DonHangModel();

    // item.full_name = this.registrationForm.controls["fullname"].value;
    // item.password = this.registrationForm.controls["password"].value;
    // item.phone = this.registrationForm.controls["phone"].value.toString();
    // item.email = this.registrationForm.controls["email"].value;
    // item.address = this.registrationForm.controls["address"].value;
    // item.user_name = this.registrationForm.controls["username"].value;


    item.account_id = this.User[0].account_id;
    item.Tongtien = this.tongtien;
    item.address = this.registrationForm.controls["address"].value;
    item.phone = this.registrationForm.controls["phone"].value.toString();
    item.full_name = this.registrationForm.controls["fullname"].value;
    item.ListOrderIteam = this.listOrder;
    item.email = this.registrationForm.controls["email"].value;;
    // item.DonGia = Number.parseInt(this.lstProducDetail[0].DonGia) * 1000;
    // item.Size = this.Size;
    // item.phone = this.User[0].phone
    // item.category_id = this.lstProducDetail[0].category_id
    // item.color = this.color;
    // item.product_name = this.lstProducDetail[0].product_name
    // item.Img = this.lstProducDetail[0].Img
    // item.address = this.User[0].address;
    // item.full_name = this.User[0].full_name;
    // item.soluong = this.sl
    // item.product_id = this.product_id;

    return item
  }
  CreatedPay() {
    if (this.registrationForm.controls["phone"].value.toString().length > 11) {
      this.layoutUtilsService.showActionNotification("SĐT không hợp lệ", MessageType.Delete, 4000, true, false, 3000, 'top', 0);

    }
    else {

      const _title = this.translate.instant('Thanh toán');
      const _description = this.translate.instant('Bạn có muốn thanh toán không ?');
      const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
      const _deleteMessage = this.translate.instant('Thanh toán đơn hàng thành công !');
      const _erroMessage = this.translate.instant('Thất bại !');
      const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
      dialogRef.afterClosed().subscribe((res) => {
        if (!res) {
          return;
        }
        else {

          let item = this.ItemDonHang();
          this.order_services.InsertDonHang(item, this.User[0].account_id).subscribe((res: any) => {
            console.log("resss", res)
            if (res && res.status == 1) {

              this.isKeyXaNhan = true;
              this.changeDetectorRefs.detectChanges();
              let ma = Math.floor(Math.random() * 90000) + 10000;
              this.order_services.SendGmail("Mã Xác Nhận", 'Mã xác nhận của quý khách: ' + ma, this.registrationForm.controls["email"].value).subscribe(res => {

              })
              this.tongtien = '0';
              this.ship = '0'
              this.IdDonHang = res.data.Id_Donhang;
              this.product.RecountCart$.next(true);
              this.GetCartByAcount();
              this.notify.sendThanhToan(item);


              this.order_services.SaveKeyGmail(res.data.Id_Donhang, ma).subscribe(res => {

              })
              // lưu mã vào table


              // this.router.navigate(['/Home/All']);
              this.layoutUtilsService.showActionNotification("Đặt hàng thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);


            }
          })
        }


      });
    }

  }
  RemoveOrderIteam(order_id) {
    const _title = this.translate.instant('Xóa sản phẩm');
    const _description = this.translate.instant('Bạn có muốn xóa không ?');
    const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
    const _deleteMessage = this.translate.instant('Xóa sản phẩm thành công !');
    const _erroMessage = this.translate.instant('Thất bại !');
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      else {
        this.order_services.RemoveOrderIteam(order_id).subscribe((res: any) => {
          if (res) {
            this.product.RecountCart$.next(true);
            this.notify.reload.next(true);
            this.GetCartByAcount();
            this.layoutUtilsService.showActionNotification("Thành Công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);

          }
        })

      }


    });
  }
  submit() {

  }
  initForm() {
    this.registrationForm = this.fb.group(
      {
        fullname: [
          this.hoten,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        phone: [
          this.sdt,
          Validators.compose([
            Validators.required,
            Validators.maxLength(11),
          ]),
        ],


        address: [
          this.diachi,
          Validators.compose([
            Validators.required,

          ]),
        ],

        email: [
          this.email,
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],

        // agree: [false, Validators.compose([Validators.required])],
      },
      {
      }
    );
  }
  ngOnInit(): void {
    this.isKeyXaNhan = false
    this.hoten = this.User[0].full_name
    this.email = this.User[0].email
    this.diachi = this.User[0].address
    this.sdt = this.User[0].phone
    this.GetCartByAcount();
    this.initForm();
  }

}

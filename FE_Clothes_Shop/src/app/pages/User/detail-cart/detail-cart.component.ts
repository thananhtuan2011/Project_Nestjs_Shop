import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../services/product.service';
import { TopbarService } from '../../_layout/components/topbar/topbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DonHangModel } from '../models/Donghang.model';

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.scss']
})
export class DetailCartComponent implements OnInit {
  listOrder: any[] = []
  registrationForm: FormGroup;
  hasError: boolean;
  isUpdate: boolean;
  isLoading$: Observable<boolean>;
  @Input() iddonhang: any;
  User: any;
  hoten: string = '';
  diachi: string = '';
  sdt: string = '';
  email: string = '';
  isxacnhan: boolean;
  DetailCart: any
  constructor(private notify: NotifyService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private order_services: OrderService, private layoutUtilsService: LayoutUtilsService, private translate: TranslateService, private product: ProductService, private topbar_services: TopbarService, private changeDetectorRefs: ChangeDetectorRef) {

    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
  }
  tien: number = 0;
  tongtien: string;
  GetDonHangAcountDetail(id) {
    this.order_services.GetDonHangAcountDetail(this.User[0].account_id, id).subscribe((res: any) => {
      this.listOrder = res.data;
      localStorage.setItem("DetailCart", JSON.stringify(this.listOrder));
      this.changeDetectorRefs.detectChanges();
      if (this.listOrder) {

        if (this.listOrder.length > 0) {
          this.notify.getInforDetailCart.next('load')

          this.hoten = this.listOrder[0].full_name
          this.email = this.listOrder[0].email
          this.diachi = this.listOrder[0].address
          this.sdt = this.listOrder[0].phone
        }

        if (this.listOrder[0].status == 0) {
          this.isxacnhan = true
        }
        else {
          this.isxacnhan = false
        }


      }


    })
  }

  ItemDonHang(): DonHangModel {

    const item = new DonHangModel();
    item.account_id = this.User[0].account_id;
    item.address = this.registrationForm.controls["address"].value;;
    item.phone = this.registrationForm.controls["phone"].value;;
    item.full_name = this.registrationForm.controls["fullname"].value;;
    item.email = this.registrationForm.controls["email"].value;;


    return item
  }
  CreatedPay() {
    const _title = this.translate.instant('Thay đổi thông tin');
    const _description = this.translate.instant('Bạn có muốn thay đổi không ?');
    const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
    const _deleteMessage = this.translate.instant('Thay đổi thành công !');
    const _erroMessage = this.translate.instant('Thất bại !');
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      else {
        let item = this.ItemDonHang();
        this.order_services.EditDonHang(item, this.iddonhang).subscribe((res: any) => {
          console.log("thay đổi", res)
          if (res && res.status == 1) {
            // this.notify.sendThanhToan(item);
            // this.router.navigate(['/Home']);
            this.layoutUtilsService.showActionNotification("Thay đổi thông tin thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
            this.GetDonHangAcountDetail(this.iddonhang);

          }
        })
      }


    });
  }
  RemoveOrder(order_id) {
    const _title = this.translate.instant('Xóa đơn hàng');
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
            this.notify.thanhtoan.next(true)
            this.layoutUtilsService.showActionNotification("Thành Công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
            this.router.navigate(['/Home/All']);
          }
        })

      }


    });
  }



  initForm() {
    this.DetailCart = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('DetailCart'))));
    console.log("DetailCart", this.DetailCart)
    if (this.DetailCart[0].updated_at == null) {
      this.isUpdate = true;
    }
    else {
      this.isUpdate = false
      this.hoten = this.DetailCart[0].full_name
      this.email = this.DetailCart[0].email
      this.diachi = this.DetailCart[0].address
      this.sdt = this.DetailCart[0].phone
    }

    this.registrationForm = this.fb.group(
      {
        fullname: [{
          value: this.DetailCart[0].full_name,

          disabled: true
        }],
        phone: [{
          value: this.DetailCart[0].phone,
          disabled: true
        }],



        address: [
          {
            value: this.DetailCart[0].address,
            disabled: false
          },

        ],

        email: [{
          value: this.DetailCart[0].email,
          disabled: true
        }],
        // agree: [false, Validators.compose([Validators.required])],
      },
      {
      }
    );
  }
  ngOnInit(): void {
    this.notify.getInforDetailCart.subscribe(res => {
      console.log("resss", res)
      if (res == 'load') {
        this.initForm()
      }
    })
    this.route.params.subscribe(params => {
      this.iddonhang = +params.IdDonHang;
      this.GetDonHangAcountDetail(this.iddonhang);
      this.initForm()








    })
  }



}

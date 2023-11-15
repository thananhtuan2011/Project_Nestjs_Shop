import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../services/product.service';
import { TopbarService } from '../../_layout/components/topbar/topbar.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DonHangModel } from '../models/Donghang.model';

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.scss']
})
export class DetailCartComponent implements OnInit {
  listOrder: any[] = []
  // registrationForm: FormGroup;
  registrationForm = new FormGroup({
    fullname: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    email: new FormControl()
  });
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
  status: number;
  GetDonHangAcountDetail(id) {
    this.order_services.GetDonHangAcountDetail(id).subscribe((res: any) => {
      console.log("this.resresresres", res)
      this.listOrder = res.data;
      console.log("this.listOrder", this.listOrder)
      localStorage.setItem("DetailCart", JSON.stringify(this.listOrder));
      this.changeDetectorRefs.detectChanges();
      if (this.listOrder) {

        this.status = this.listOrder[0].status;
        if (this.listOrder.length > 0) {
          this.notify.getInforDetailCart.next('load')

          this.hoten = this.listOrder[0].full_name
          this.email = this.listOrder[0].email
          this.diachi = this.listOrder[0].address
          this.sdt = this.listOrder[0].phone
        }

        if (this.listOrder[0].status == 1) {
          this.isxacnhan = true
        }
        else {
          this.isxacnhan = false
        }
        this.initForm()

      }


    })
  }

  ItemDonHang(): DonHangModel {

    const item = new DonHangModel();
    // item.account_id = this.User.account_id;
    item.address = this.diachi;
    item.phone = this.sdt;;
    item.full_name = this.hoten;;
    item.email = this.email;;
    item._idonhang = this.iddonhang
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
        console.log("itemitemv", item)
        this.order_services.EditDonHang(item).subscribe((res: any) => {

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

    if (this.DetailCart[0].updatedAt != this.DetailCart[0].createdAt) {
      this.isUpdate = true;
      this.hoten = this.DetailCart[0].full_name
      this.email = this.DetailCart[0].email
      this.diachi = this.DetailCart[0].address
      this.sdt = this.DetailCart[0].phone
      this.changeDetectorRefs.detectChanges();
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
            disabled: true
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
    this.changeDetectorRefs.detectChanges();
  }
  ngOnInit(): void {
    // this.notify.getInforDetailCart.subscribe(res => {
    //   console.log("ressdưqdqwqds", res)
    //   if (res == 'load') {
    //     setTimeout(() => {
    //       this.initForm()

    //     }, 1000);
    //   }
    // })
    this.route.params.subscribe(params => {
      console.log("params", params)
      this.iddonhang = params.IdDonHang;
      this.GetDonHangAcountDetail(this.iddonhang);
      this.initForm()








    })
  }



}

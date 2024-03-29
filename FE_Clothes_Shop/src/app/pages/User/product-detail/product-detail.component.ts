import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { OrderModel } from '../models/Order.model';
import { TopbarService } from '../../_layout/components/topbar/topbar.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product_id: any;
  comment: string;
  sl: number = 1;
  color: string = "Trắng";
  Size: string = "XL";
  lstProductSeller: any[] = []
  ListColor: any[] = [
    { name: 'Trắng', selected: true },
    { name: 'Đen', selected: false },
    { name: 'Xám', selected: false },
    { name: 'Nâu', selected: false },
  ];
  ListSize: any[] = [
    { name: 'XL', selected: true },
    { name: 'XXL', selected: false },
    { name: 'M', selected: false },
    { name: 'L', selected: false },
  ];
  lstProducDetail: any;
  User: any;
  constructor(private route: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private product_services: ProductService,
    private changeDetectorRefs: ChangeDetectorRef,
    private order_services: OrderService,
    private router: Router,) { this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User')))); }
  GetProduct_Detail(id) {
    this.product_services.GetProductDetail(id).subscribe((res: any) => {
      if (res) {
        this.lstProducDetail = res.data;
        console.log("lstProducDetail", this.lstProducDetail)
        this.changeDetectorRefs.detectChanges();
      }
    })
  }

  onChangeSize($event: any) {

    this.Size = $event.value
    console.log('Selected chip: ', this.Size);
  }
  onChange($event: any) {
    this.color = $event.value
  }
  GetDSBest() {
    this.product_services.GetDSBest().subscribe((res: any) => {
      if (res) {
        this.lstProductSeller = res.data;
        console.log("lstProductSeller", this.lstProductSeller)
        this.changeDetectorRefs.detectChanges();
      }
    })
  }
  ItemOrder(sl): OrderModel {

    const item = new OrderModel();
    item.DonGia = Number.parseInt(this.lstProducDetail.DonGia);
    item.Size = this.Size;
    item.phone = this.User.phone
    item.Category = [{ _id: "6544b23e0050bd3363cbc288" }]
    item.color = this.color;
    item.product_name = this.lstProducDetail.product_name
    item.Img = this.lstProducDetail.Img
    item.address = this.User.address;
    item.full_name = this.User.full_name;
    item.soluong = sl
    item.Pay = false;
    item.Product = [{ _id: this.product_id }];
    item.User = { _id: this.User.account_id }

    return item
  }
  AddCount() {
    this.sl = this.sl + 1;
    this.changeDetectorRefs.detectChanges();
  }
  RemoveCount() {
    if (this.sl < 1) {
      this.layoutUtilsService.showActionNotification("Số lượng không được nhỏ hơn 0", MessageType.Delete, 4000, true, false, 3000, 'top', 0);

    }
    else {
      this.sl = this.sl - 1

    }
    this.changeDetectorRefs.detectChanges();
  }
  AddGioHang(mount) {

    if (this.sl > mount) {
      this.layoutUtilsService.showActionNotification("Số lượng hàng chỉ còn" + mount, MessageType.Delete, 4000, true, false, 3000, 'top', 0);

    }
    else {

      if (this.User) {


        let item = this.ItemOrder(this.sl);
        console.log("itemitemitem", item)
        this.order_services.InsertOrder(item).subscribe((res: any) => {
          if (res) {
            this.product_services.UpdateLuotMua(this.product_id, this.lstProducDetail.amount, this.sl).subscribe(res => {

              // update lượt mua 
              this.GetProduct_Detail(this.product_id)

              this.layoutUtilsService.showActionNotification("Thành Công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);

            })
            this.product_services.RecountCart$.next(true);
          }
        })
      }
      else {
        this.layoutUtilsService.showActionNotification("Vui lòng đăng nhập", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
        this.router.navigate(['/auth/login'], {
          queryParams: {},
        });
      }
    }


  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.GetDSBest();

      this.product_id = params.id_product;
      this.GetProduct_Detail(this.product_id)


    })
  }

}

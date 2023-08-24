import { MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { LayoutUtilsService } from '../../../modules/auth/crud/utils/layout-utils.service';
import { environment } from 'src/environments/environment';
import { PaginatorState } from '../../../_metronic/shared/crud-table/models/paginator.model';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../User/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GroupingState, SortState } from 'src/app/_metronic/shared/crud-table';
import { ActivatedRoute } from '@angular/router';
import { XacNhanComponent } from '../xac-nhan/xac-nhan.component';
import { NotifyService } from 'src/app/_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { TranslateService } from '@ngx-translate/core';
import { AddsanphamComponent } from '../addsanpham/addsanpham.component';
import { UpdateSanphamComponent } from '../update-sanpham/update-sanpham.component';


@Component({
  selector: 'app-hethang',
  templateUrl: './hethang.component.html',
  styleUrls: ['./hethang.component.scss']
})
export class HethangComponent implements OnInit {

  User: any;

  Gia = [
    { value: '1', viewValue: 'Chưa xác nhận' },
    { value: '2', viewValue: 'Đã xác nhận' },
    { value: '3', viewValue: 'Từ chối' },
  ];
  selected: any

  apiproduct = environment.apiUrl + "product/HetHang";;
  constructor(
    public product_services: ProductService,
    private layoutUtilsService: LayoutUtilsService,
    private notyfi: NotifyService,
    private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute, private translate: TranslateService) {
    this.User = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
  }
  paginator: PaginatorState;
  keymenu: any
  idmenu: any;
  @Output() Quaylai = new EventEmitter();
  @Input() RowID: number;
  RowIdTeam: any;
  idSubmenu: any;
  searchtext: string;
  isprivate: any;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  catogy_id: any
  namecatego: string;
  private subscriptions: Subscription[] = [];



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.catogy_id = +params.id;
      this.namecatego = params.type;
      this.LoadAllProductType()

    })

    this.grouping = this.product_services.grouping;
    this.paginator = this.product_services.paginator;
    this.sorting = this.product_services.sorting;
  }
  Goback() {
    this.Quaylai.emit()
  }
  XacNhan(item) {
    if (item.status == 0) {
      this.layoutUtilsService.showActionNotification("Đơn hàng đã xác nhận", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
    }
    else {

      const dialogRef = this.dialog.open(XacNhanComponent, {
        width: '500px',
        data: { item },
        //with:'500px',
        // height:'600px',

        // panelClass:'no-padding'

      });
      dialogRef.afterClosed().subscribe(res => {

        console.log("resresres")
        if (res) {
          this.LoadAllProductType()
          this.changeDetectorRefs.detectChanges();
        }
      })
    }

  }

  UpdateSp(item) {

    const dialogRef = this.dialog.open(UpdateSanphamComponent, {
      width: '500px',
      data: { item },
      //with:'500px',
      height: '600px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllProductType()
        this.changeDetectorRefs.detectChanges();
      }
    })

  }

  saverange(value) {
    this.search(value)

  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['product_name'] = value

      this.product_services.patchStateHetHang({ filter }, this.apiproduct + `?category_id=${this.catogy_id}`);
    }
    else {

      const filter = {};


      this.product_services.patchStateHetHang({ filter }, this.apiproduct + `?category_id=${this.catogy_id}`);
    }

  }

  LoadAllProductType() {
    const filter = {};
    this.product_services.patchStateHetHang({ filter }, this.apiproduct + `?category_id=${this.catogy_id}`);

  }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }

  paginate(paginator: PaginatorState) {
    this.product_services.patchStateHetHang({ paginator }, this.apiproduct + `?category_id=${this.catogy_id}`);
  }
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.product_services.patchStateHetHang({ sorting }, this.apiproduct + `?category_id=${this.catogy_id}`);
  }

  RemoveSP(product_id) {
    const _title = this.translate.instant('Xóa  sản phẩm');
    const _description = this.translate.instant('Bạn có muốn xóa không ?');
    const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
    const _deleteMessage = this.translate.instant('Xóa thành công !');
    const _erroMessage = this.translate.instant('Thất bại !');
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      else {
        this.product_services.RemoveSp(product_id).subscribe((res: any) => {
          if (res && res.status == 1) {

            this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
            this.LoadAllProductType()

          }
        })
      }


    });
  }
  AddSP() {
    const dialogRef = this.dialog.open(AddsanphamComponent, {
      width: '600px',
      // data: {  },
      // with:'500px',
      height: '600px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllProductType()
      }
    })

  }


}

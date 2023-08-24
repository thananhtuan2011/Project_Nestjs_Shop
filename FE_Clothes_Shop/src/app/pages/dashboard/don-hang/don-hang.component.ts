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

@Component({
  selector: 'app-don-hang',
  templateUrl: './don-hang.component.html',
  styleUrls: ['./don-hang.component.scss']
})
export class DonHangComponent implements OnInit {
  User: any;

  Gia = [
    { value: '1', viewValue: 'Chưa xác nhận' },
    { value: '2', viewValue: 'Đã xác nhận' },
    { value: '3', viewValue: 'Từ chối' },
  ];
  selected: any

  apiproduct = environment.apiUrl + "donhang/AllDonHang";
  constructor(
    public product_services: ProductService,
    private layoutUtilsService: LayoutUtilsService,
    private notyfi: NotifyService,
    private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute,) {
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
  EventDonHang() {
    this.notyfi.thanhtoan.subscribe((res: any) => {

      if (res.account_id != this.User[0].account_id && this.User[0].role_code == "1") {
        this.LoadAllProductType();
      }

    })
  }
  onGiaSelection() {
    const sorting = this.sorting;
    console.log(this.selected);
    if (this.selected == 1) {
      this.product_services.patchStateAllDonHang({}, this.apiproduct + `?keyloc=${this.selected}`);

    }
    else if (this.selected == 2) {
      this.product_services.patchStateAllDonHang({}, this.apiproduct + `?keyloc=${this.selected}`);
      //asce

    }
    else {
      this.product_services.patchStateAllDonHang({}, this.apiproduct + `?keyloc=${this.selected}`);
    }

  }

  ngOnInit(): void {
    this.EventDonHang();
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

  saverange(value) {
    this.search(value)

  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['FullName'] = value

      this.product_services.patchStateAllDonHang({ filter }, this.apiproduct);
    }
    else {

      const filter = {};


      this.product_services.patchStateAllDonHang({ filter }, this.apiproduct);
    }

  }

  LoadAllProductType() {
    const filter = {};
    this.product_services.patchStateAllDonHang({ filter }, this.apiproduct);

  }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }

  paginate(paginator: PaginatorState) {
    this.product_services.patchStateAllDonHang({ paginator }, this.apiproduct);
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
    this.product_services.patchStateAllDonHang({ sorting }, this.apiproduct);
  }



}

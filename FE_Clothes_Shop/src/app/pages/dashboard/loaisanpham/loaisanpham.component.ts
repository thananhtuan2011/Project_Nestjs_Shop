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
import { NotifyService } from 'src/app/_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../admin.service';
import { UpdaterolseComponent } from '../updaterolse/updaterolse.component';
import { AddLoaiComponent } from '../add-loai/add-loai.component';
import { UpdatecategoryComponent } from '../updatecategory/updatecategory.component';


@Component({
  selector: 'app-loaisanpham',
  templateUrl: './loaisanpham.component.html',
  styleUrls: ['./loaisanpham.component.scss']
})
export class LoaisanphamComponent implements OnInit {
  User: any;
  apiproduct = environment.apiUrl + "loai/AllCategory";
  constructor(
    public product_services: ProductService,
    private layoutUtilsService: LayoutUtilsService,
    private admin: AdminService,
    private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private translate: TranslateService, private route: ActivatedRoute,) {
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

    this.LoadAllCate()


    this.grouping = this.product_services.grouping;
    this.paginator = this.product_services.paginator;
    console.log("   this.paginator", this.paginator)
    this.sorting = this.product_services.sorting;
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

      this.product_services.patchStateCategory({ filter }, this.apiproduct + `?category_id=${this.catogy_id}`);
    }
    else {

      const filter = {};


      this.product_services.patchStateCategory({ filter }, this.apiproduct);
    }

  }

  LoadAllCate() {
    const filter = {};
    this.product_services.patchStateCategory({ filter }, this.apiproduct);

  }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }

  paginate(paginator: PaginatorState) {
    this.product_services.patchStateCategory({ paginator }, this.apiproduct);
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
    this.product_services.patchStateCategory({ sorting }, this.apiproduct + `?category_id=${this.catogy_id}`);
  }

  AddLoai() {
    const dialogRef = this.dialog.open(AddLoaiComponent, {
      width: '500px',
      // data: {  },
      //with:'500px',
      // height:'600px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllCate()
      }
    })

  }

  UpdateLoai(item) {
    const dialogRef = this.dialog.open(UpdatecategoryComponent, {
      width: '500px',
      data: { item },
      //with:'500px',
      // height:'600px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllCate()
      }
    })

  }

  RemoveLoai(category_id) {
    const _title = this.translate.instant('Xóa loại sản phẩm');
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
        this.admin.RemoveLoai(category_id).subscribe((res: any) => {
          if (res && res.status == 1) {

            this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
            this.LoadAllCate()

          }
        })
      }


    });
  }


}

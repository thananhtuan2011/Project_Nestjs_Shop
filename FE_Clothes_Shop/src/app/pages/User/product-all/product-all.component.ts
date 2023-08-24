import { GroupingState } from './../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../_metronic/shared/crud-table/models/sort.model';
import { MatDialog } from '@angular/material/dialog';
import { PaginatorState } from './../../../_metronic/shared/crud-table/models/paginator.model';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss']
})
export class ProductAllComponent implements OnInit {
  selected: any
  apiproduct = environment.apiUrl + "product/AllProduct";;
  constructor(
    public product_services: ProductService,
    private layoutUtilsService: LayoutUtilsService,
    private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,) { }
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
  Gia = [
    { value: '1', viewValue: 'Tăng dần' },
    { value: '2', viewValue: 'Giảm dần' },
  ];
  private subscriptions: Subscription[] = [];
  ngOnInit(): void {
    this.LoadAllProduct()

    this.grouping = this.product_services.grouping;
    this.paginator = this.product_services.paginator;
    this.sorting = this.product_services.sorting;
  }
  Goback() {
    this.Quaylai.emit()
  }

  saverange(value) {
    this.search(value)

  }
  onGiaSelection() {
    const sorting = this.sorting;
    console.log(this.selected);
    if (this.selected == 1) {
      // tăng dần
      sorting.column = "DonGia"
      sorting.direction = 'desc'

    }
    else {
      sorting.column = "DonGia"
      sorting.direction = 'asc'
      //asce

    }

    this.product_services.patchStateAllProduect({ sorting }, this.apiproduct);
  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['product_name'] = value

      this.product_services.patchStateAllProduect({ filter }, this.apiproduct);
    }
    else {

      const filter = {};


      this.product_services.patchStateAllProduect({ filter }, this.apiproduct);
    }

  }

  LoadAllProduct() {
    const filter = {};
    this.product_services.patchStateAllProduect({ filter }, this.apiproduct);

  }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }

  paginate(paginator: PaginatorState) {
    this.product_services.patchStateAllProduect({ paginator }, this.apiproduct);
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
    this.product_services.patchStateAllProduect({ sorting }, this.apiproduct);
  }


  // Phanquyen(Id:number,Admin:boolean,iMember:boolean,user:any)
  // {
  //   const dialogRef = this.dialog.open(EditQuyenUserInteamComponent, {
  //     width:'500px',
  //      data:{RowId:this.RowID,IdUser:Id,isAdmin:Admin,isMember:iMember,user},
  //      //with:'500px',
  //     // height:'600px',

  //         // panelClass:'no-padding'

  //       });
  //     dialogRef.afterClosed().subscribe(res => {


  //             if(res)
  //       {
  //         this.LoadThanhvien(this.RowID);

  //         this.changeDetectorRefs.detectChanges();
  //       }
  //             })

  // }
  // DeleteMember(IdUser:number)
  // {
  //   this.member_service.DeleteMember(this.idSubmenu,IdUser).subscribe(res=>{
  //     if(res)
  //     {
  //       this.LoadThanhvien(this.idmenu, this.isprivate);
  //     }
  //   })
  // }



}

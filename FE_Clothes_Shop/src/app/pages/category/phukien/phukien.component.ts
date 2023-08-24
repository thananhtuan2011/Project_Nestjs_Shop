import { LayoutUtilsService } from '../../../modules/auth/crud/utils/layout-utils.service';
import { environment } from 'src/environments/environment';
import { PaginatorState } from '../../../_metronic/shared/crud-table/models/paginator.model';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../User/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GroupingState, SortState } from 'src/app/_metronic/shared/crud-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phukien',
  templateUrl: './phukien.component.html',
  styleUrls: ['./phukien.component.scss']
})
export class PhukienComponent implements OnInit {
  l
  apiproduct = environment.apiUrl + "loai/AllProductType";;
  constructor(
    public product_services: ProductService,
    private layoutUtilsService: LayoutUtilsService,
    private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute,) { }
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
  listphukien: any[] = []
  catogy_id: any
  idsub: any
  namecatego: string;
  private subscriptions: Subscription[] = [];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("ressss,", params)
      this.catogy_id = 6;
      this.idsub = +params.idsub;

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

  saverange(value) {
    this.search(value)

  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['FullName'] = value

      this.product_services.patchStateAllProduectType({ filter }, this.apiproduct + `?category_id=${this.catogy_id}`);
    }
    else {

      const filter = {};


      this.product_services.patchStateAllProduectType({ filter }, this.apiproduct + `?category_id=${this.catogy_id}`);
    }

  }

  LoadAllProductType() {
    const filter = {};
    this.product_services.patchStateAllProduectType({ filter }, this.apiproduct + `?category_id=${this.catogy_id}`);
    this.product_services._itemsteamtype$.subscribe((res: any) => {
      console.log("ress", res)
      console.log("idsub", this.idsub)
      if (this.idsub == 1) {
        this.listphukien = res.slice(0, 2);
      }
      else {
        this.listphukien = res.slice(2, 5);
      }


      console.log("this.list[hu", this.listphukien)
    })

  }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }

  paginate(paginator: PaginatorState) {
    this.product_services.patchStateAllProduectType({ paginator }, this.apiproduct + `?category_id=${this.catogy_id}`);
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
    this.product_services.patchStateAllProduectType({ sorting }, this.apiproduct + `?category_id=${this.catogy_id}`);
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

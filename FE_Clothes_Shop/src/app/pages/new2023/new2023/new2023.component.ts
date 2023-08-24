import { SortState } from '../../../_metronic/shared/crud-table/models/sort.model';
import { GroupingState } from '../../../_metronic/shared/crud-table/models/grouping.model';
import { LayoutUtilsService } from '../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginatorState } from 'src/app/_metronic/shared/crud-table';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { ProductService } from '../../User/services/product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new2023',
  templateUrl: './new2023.component.html',
  styleUrls: ['./new2023.component.scss']
})
export class New2023Component implements OnInit {


  apiproduct = environment.apiUrl + "product/AllProduct";;
  constructor(
    config: NgbCarouselConfig,
    public product_services: ProductService,
    private layoutUtilsService: LayoutUtilsService,
    private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,) {
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
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

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['FullName'] = value

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

}

import { AdminService } from '../../dashboard/admin.service';
import { OrderService } from '../services/order.service';
import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatesanphamcart',
  templateUrl: './updatesanphamcart.component.html',
  styleUrls: ['./updatesanphamcart.component.scss']
})
export class UpdatesanphamcartComponent implements OnInit {
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
  listCate: any[] = []

  color: string;
  Size: string;
  tensp: string;
  sl: number;
  base64: string;
  GiaKM: number
  GiaGoc: number
  Mota: string;
  filename: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private order_services: OrderService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<UpdatesanphamcartComponent>,) {
  }



  goBack() {

    this.dialogRef.close();

  }
  onChangeSize($event: any) {

    this.Size = $event.value
    console.log('Selected chip: ', this.Size);
  }
  onChange($event: any) {
    this.color = $event.value
  }

  ngOnInit(): void {
    console.log("data", this.data)
    this.sl = this.data.item.soluong;
    this.color = this.data.item.color;
    this.Size = this.data.item.Size;

  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {
    if (this.sl <= 0) {
      this.layoutUtilsService.showActionNotification("Ít nhất phải lớn hơn 1", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
    }
    else {

      this.order_services.UpdateSpOrder(this.data.item.order_id, this.color, this.sl, this.Size).subscribe(res => {
        if (res) {
          this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          this.CloseDia(res);
        }
      })
    }



  }
}

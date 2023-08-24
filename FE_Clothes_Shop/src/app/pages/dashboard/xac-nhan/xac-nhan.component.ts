import { MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { LayoutUtilsService } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { NotifyService } from 'src/app/_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';

@Component({
  selector: 'app-xac-nhan',
  templateUrl: './xac-nhan.component.html',
  styleUrls: ['./xac-nhan.component.scss']
})
export class XacNhanComponent implements OnInit {
  name: string;
  Avatar: string
  BgColor: string;
  valueradio: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private admin_services: AdminService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<XacNhanComponent>,) {
  }
  goBack() {

    this.dialogRef.close();

  }
  submit() {
    console.log("valueradio", this.valueradio)
    if (this.valueradio == 1) {
      this.admin_services.UpdateTTDonHang(this.data.item.Id_Donhang, this.valueradio).subscribe(res => {
        if (res) {
          this.notify.XacNhanDon(this.data.item.account_id)
          this.admin_services.SendGmail("Đơn hàng của quý khách đã được xác nhận", "Đơn hàng" + this.data.item.Id_Donhang + 'đã được xác nhận vào giao hàng trong khoảng 2 ngày', this.data.item.email).subscribe(res => {

          })
          this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          this.CloseDia(res);
        }
      })
    }
    else if (this.valueradio == 2) {
      // từ chối
      this.admin_services.UpdateTTDonHang(this.data.item.Id_Donhang, this.valueradio).subscribe(res => {
        if (res) {
          this.notify.XacNhanDon(this.data.item.account_id)
          this.admin_services.SendGmail("Đơn hàng của quý khách đã bị từ chối", "Đơn hàng" + this.data.item.Id_Donhang + 'đã bị từ chối vì nhiều lý do thông tin không chính xấc', this.data.item.email).subscribe(res => {

          })
          this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          this.CloseDia(res);
        }
      })
    }
    else {
      this.layoutUtilsService.showActionNotification("Thất bại", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
    }

  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  ngOnInit(): void {
    console.log("data", this.data)
  }


}

import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-loai',
  templateUrl: './add-loai.component.html',
  styleUrls: ['./add-loai.component.scss']
})
export class AddLoaiComponent implements OnInit {
  tenloai: string;
  maloai: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private admin_services: AdminService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<AddLoaiComponent>,) {
  }

  goBack() {

    this.dialogRef.close();

  }

  ngOnInit(): void {
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {

    var item = {
      category_name: this.tenloai,
      category_code: this.maloai
    }

    this.admin_services.Addloai(item).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
    })


  }
}

import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.scss']
})
export class UpdatecategoryComponent implements OnInit {

  tenloai: string;
  maloai: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private admin_services: AdminService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<UpdatecategoryComponent>,) {
  }

  goBack() {

    this.dialogRef.close();

  }

  ngOnInit(): void {
    console.log("rrrrr", this.data)
    this.tenloai = this.data.item.category_name
    this.maloai = this.data.item.category_code
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {

    var item = {
      category_name: this.tenloai,
      category_code: this.maloai
    }

    this.admin_services.UpdateCategory(item, this.data.item.category_id).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
    })


  }

}

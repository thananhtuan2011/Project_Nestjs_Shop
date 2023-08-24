import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-updaterolse',
  templateUrl: './updaterolse.component.html',
  styleUrls: ['./updaterolse.component.scss']
})
export class UpdaterolseComponent implements OnInit {

  name: string;
  Avatar: string
  BgColor: string;
  valueradio: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private admin_services: AdminService,
    private dialogRef: MatDialogRef<UpdaterolseComponent>,) {
  }
  goBack() {

    this.dialogRef.close();

  }
  submit() {

    this.admin_services.UpdateRoles(this.data.item.account_id, this.valueradio).subscribe(res => {
      if (res) {
        // this.UpdateRoles()
        this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
      else {
        this.layoutUtilsService.showActionNotification("Thất bại", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
      }

    })



  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  ngOnInit(): void {
    if (this.data.item.admin == true) {
      this.valueradio = '1';
    }
    if (this.data.item.admin == false) {
      this.valueradio = '2';
    }
    console.log("data", this.data)
  }


}

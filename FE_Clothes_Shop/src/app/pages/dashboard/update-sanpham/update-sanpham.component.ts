import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-sanpham',
  templateUrl: './update-sanpham.component.html',
  styleUrls: ['./update-sanpham.component.scss']
})
export class UpdateSanphamComponent implements OnInit {
  listCate: any[] = []
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
    private admin_services: AdminService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<UpdateSanphamComponent>,) {
  }

  GetLoai() {
    this.admin_services.GetCategory().subscribe((res: any) => {

      if (res) {
        this.listCate = res.data;
        this.changeDetectorRefs.detectChanges();
      }

    })
  }
  selected: any
  onGiaSelection() {


  }

  goBack() {

    this.dialogRef.close();

  }

  ngOnInit(): void {
    this.GetLoai();
    this.tensp = this.data.item.product_name;
    this.GiaGoc = this.data.item.DonGiaGoc
    this.GiaKM = this.data.item.DonGia;
    this.sl = this.data.item.amount;
    this.selected = this.data.item.category_id;
    this.Mota = this.data.item.Mota

  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {

    var item = {
      amount: Number.parseInt(this.sl.toString()),
      product_name: this.tensp,
      category_id: this.selected,
      DonGia: Number.parseInt(this.GiaKM.toString()) * 1000,
      DonGiaGoc: Number.parseInt(this.GiaGoc.toString()) * 1000,
      Mota: this.Mota,
      base64: this.base64,
      filename: this.filename
    }
    console.log("item", item)

    this.admin_services.UpdateProduct(item, this.data.item.product_id).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
    })


  }

}

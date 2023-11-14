import { NotifyService } from './../../../_metronic/partials/layout/extras/offcanvas/quick-panel-offcanvas/notify.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-addsanpham',
  templateUrl: './addsanpham.component.html',
  styleUrls: ['./addsanpham.component.scss']
})
export class AddsanphamComponent implements OnInit {
  listCate: any[] = []
  tensp: string;
  sl: number;
  base64: string;
  GiaKM: number
  GiaGoc: number
  Mota: string;
  filename: string;
  formData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private admin_services: AdminService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<AddsanphamComponent>,) {
  }

  goBack() {

    this.dialogRef.close();

  }
  img: any
  onSelectFile_PDF(files: File[]) {
    console.log(files)
    this.formData = new FormData();
    Array.from(files).forEach(f => this.formData.append('image', f))
    // this.admin_services.AddFile(formData).subscribe(res => {
    //   console.log("ressssss fle", res)
    // });
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

  ngOnInit(): void {
    this.GetLoai()
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {

    var item = {
      amount: Number.parseInt(this.sl.toString()),
      product_name: this.tensp,
      category_id: this.selected,
      DonGia: Number.parseInt(this.GiaKM.toString()),
      DonGiaGoc: Number.parseInt(this.GiaGoc.toString()),
      Mota: this.Mota,
      base64: this.base64,
      filename: this.filename,
    }
    this.formData.append('data', JSON.stringify(item));
    console.log(" this.formData", this.formData)

    this.admin_services.AddProduct(this.formData).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
    })


  }
}

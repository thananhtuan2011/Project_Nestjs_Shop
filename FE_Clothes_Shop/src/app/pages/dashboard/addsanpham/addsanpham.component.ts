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
  onSelectFile_PDF(event) {







    if (event.target.files && event.target.files[0]) {

      var filesAmountcheck = event.target.files[0];


      var file_name = event.target.files;
      var filesAmount = event.target.files.length;


      // for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      //this.FileAttachName = filesAmount.name;
      let base64Str: any;
      let cat: any;
      reader.onload = (event) => {
        cat = file_name[0].name.substr(file_name[0].name.indexOf('.'));
        this.img = event.target.result;

        var metaIdx1 = event.target.result.toString().indexOf(';base64,');
        base64Str = event.target.result.toString().substr(metaIdx1 + 8);
        this.base64 = base64Str;
        console.log('ssss', this.base64)
        this.filename = file_name[0].name,
          // this.AttachFileChat.push({ filename: file_name[0].name, type: file_name[0].type, size: file_name[0].size, strBase64: base64Str });





          this.changeDetectorRefs.detectChanges();

      }


      //  console.log('this.list_image_Edit',this.list_image_Edit)
      reader.readAsDataURL(event.target.files[0]);




    }
    setTimeout(() => {
      event.srcElement.value = "";

    }, 1000);
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
      filename: this.filename
    }
    console.log("item", item)

    this.admin_services.AddProduct(item).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
    })


  }
}

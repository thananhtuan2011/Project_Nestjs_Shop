import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { TableUtil } from './tableUtil';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-doanhthu',
  templateUrl: './doanhthu.component.html',
  styleUrls: ['./doanhthu.component.scss']
})
export class DoanhthuComponent implements OnInit {
  listDoanhThu: any[] = [];
  single: any[];
  single2: any[];
  multi: any[] = [];
  view: any[] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Biểu đồ thể hiện doanh thu qua từng tháng';
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', 'red', '#E0115F', '#007BA7', '#40826D', '#FF00AF', '#FF4500', '#808000', '#FF007F ']
  };
  Thang = [
    { value: '0', viewValue: 'Tất cả' },
    { value: '1', viewValue: 'Tháng 1' },
    { value: '2', viewValue: 'Tháng 2' },
    { value: '3', viewValue: 'Tháng 3' },
    { value: '4', viewValue: 'Tháng 4' },
    { value: '5', viewValue: 'Tháng 5' },
    { value: '6', viewValue: 'Tháng 6' },
    { value: '7', viewValue: 'Tháng 7' },
    { value: '8', viewValue: 'Tháng 8' },
    { value: '9', viewValue: 'Tháng 9' },
    { value: '10', viewValue: 'Tháng 10' },
    { value: '11', viewValue: 'Tháng 11' },
    { value: '12', viewValue: 'Tháng 12' },
  ];
  ThangBieudo = [
    { name: '0', value: 0 },
    { name: '1', value: 0 },
    { name: '2', value: 0 },
    { name: '3', value: 0 },
    { name: '4', value: 0 },
    { name: '5', value: 0 },
    { name: '6', value: 0 },
    { name: '7', value: 0 },
    { name: '8', value: 0 },
    { name: '9', value: 0 },
    { name: '10', value: 0 },
    { name: '11', value: 0 },
    { name: '12', value: 0 },
  ];
  displayedColumns: string[] = ['donhang', 'thang', 'tien', 'ngay'];
  dataSource = this.listDoanhThu;
  constructor(private admin_services: AdminService, private changeDetectorRefs: ChangeDetectorRef,) {

    this.BieuDoDoanhThu();
  }
  selected: any;
  exportTable() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  // exportArray() {
  //   const onlyNameAndSymbolArr: Partial<PeriodicElement>[] = this.dataSource.map(x => ({
  //     name: x.name,
  //     symbol: x.symbol
  //   }));
  //   TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "DoanhThu");
  // }
  onGiaSelection() {
    this.GetDoanhthu(this.selected)


  }
  tien: number = 0;
  tongtien: number;
  // GetCartByAcount() {
  //   if (this.User) {

  //     this.topbar_services.GetCartByAcount(this.User[0].account_id).subscribe((res: any) => {
  //       this.tongtien = '0'
  //       this.tien = 0
  //       this.listOrder = res.data;
  //       this.listOrder.forEach(element => {
  //         this.tien = this.tien + Number.parseInt(element.DonGia) * element.soluong
  //       })

  //       this.tongtien = ((this.tien * 1000).toLocaleString('vi', { style: 'currency', currency: 'VND' }));
  //       console.log("  this.listOrder", this.listOrder)
  //       if (this.listOrder.length == 0) {
  //         this.tongtien = '0';
  //         this.tien = 0
  //       }
  //       this.changeDetectorRefs.detectChanges();
  //     })
  //   }

  // }

  GetDoanhthu(month) {
    this.admin_services.GetDoanhthu(month).subscribe((res: any) => {
      this.listDoanhThu = res.data;
      this.tongtien = 0
      this.listDoanhThu.forEach(element => {
        this.tongtien = this.tongtien + Number.parseFloat(element.TongTien)
      })

    })
    if (this.listDoanhThu.length > 0) {
      this.selected = this.listDoanhThu[0].MonthCurent.toString()

    }
    this.changeDetectorRefs.detectChanges();
  }
  BieuDoDoanhThu() {
    this.admin_services.BieuDoDoanhThu().subscribe((res: any) => {
      if (res) {

        this.single = res.data;
        this.single.forEach(element => {
          // if (this.isFloat(Number.parseFloat(element.TongTien))) {
          //   tr = Number.parseFloat(element.TongTien) * 1000
          // }
          // else {
          //   this.tien = this.tien + Number.parseFloat(element.TongTien)
          // }

          let item = {
            name: element.name,
            value: Number.parseInt(element.value)

          }
          if (item) {
            let index = this.multi.findIndex(x => x.name == item.name);
            if (index < 0) {
              this.multi.push(item)
            }
            else {
              // console.log("ffff", Number.parseFloat(element.value))
              // console.log("this.isFloat(Number.parseFloat(element.value)", this.isFloat(Number.parseFloat(element.value)))
              // console.log("     this.multi[index].value", this.multi[index].value)

              let item2 = {
                name: element.name,
                value: Number.parseFloat(element.value) + this.multi[index].value
              }
              this.multi.splice(index, 1, item2)

            }

          }

        })
        this.ThangBieudo.forEach(x => {
          let index = this.multi.findIndex(k => k.name == x.name);
          let index2 = this.ThangBieudo.findIndex(h => h.name == x.name);
          if (index >= 0) {
            this.ThangBieudo.splice(index2, 1, this.multi[index])
          }
        })
        this.admin_services.Bieudo.next(this.ThangBieudo)



      }
    }
    )
  }
  onSelect(event) {
    console.log(event);
  }
  ngOnInit(): void {
    this.GetDoanhthu(-1);
    this.admin_services.Bieudo.subscribe(res => {
      this.single2 = res;
      this.changeDetectorRefs.detectChanges();
    })
  }

}

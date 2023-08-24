import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  totalCount: any = 1;

  ngOnInit(): void {
    // this.getListProduct();
  }

  // getItemPerpage = (event: any) => {
  //   console.log(event)
  // }

  // nextPage = () => {
  //   this.countPage++;
  // }

  // prePage = () => {
  //   this.countPage = (this.countPage > 1) ? (this.countPage - 1) : 1;
  // }

  // firstPage = () => {
  //   this.countPage = 1;
  // }

  // lastPage = () => {
  //   this.countPage = 20;
  // }
}

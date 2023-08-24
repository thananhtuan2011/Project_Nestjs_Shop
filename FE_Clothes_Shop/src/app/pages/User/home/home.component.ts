import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';
import { ProductService } from '../services/product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    config: NgbCarouselConfig,
    private product_services: ProductService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  //Slider settings
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

  lstSize: any;
  searchString: string = '';
  lstProductSeller: any;
  lstProductNew: any;

  ngOnInit(): void {
    // document.location.reload();

  }

  // passingData(prod: any) {
  //   this.lstSize = prod.size.split(',');
  //   this.lstColor = [...new Set(this.listColor.filter((x: any) => x.product_id == prod.product_id).map((c: any) => c.color))];
  //   localStorage.setItem('lstSize', JSON.stringify(this.lstSize));
  //   localStorage.setItem('lstColor', JSON.stringify(this.lstColor));
  // }

  // getListProductSeller() {
  //   this.productService.getList().subscribe(
  //     (res) => {
  //       if (res.data.length > 0) {
  //         this.lstProductSeller = res.data.sort((a: any, b: any) => (a.amount > b.amount) ? 1 : -1);
  //         this.lstProductSeller = this.lstProductSeller.slice(0, 5);
  //         this.lstProductNew = res.data.sort((a: any, b: any) => (a.product_id < b.product_id) ? 1 : -1);
  //         this.lstProductNew = this.lstProductNew.slice(0, 5);
  //       }
  //     }
  //   )
  // }
}

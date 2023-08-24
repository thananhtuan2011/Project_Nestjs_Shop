import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  listProduct: any;
  listSlide: any;
  searchString: string;
  lstProductNew: [];
  lstProductSeller: any
  constructor(private product_services: ProductService,
    config: NgbCarouselConfig,
    private changeDetectorRefs: ChangeDetectorRef) {
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  getListSPHome() {
    this.product_services.getListSPHome().subscribe((res: any) => {
      if (res) {
        this.listProduct = res.data;
        console.log("getListSPHome", this.listProduct)
        this.changeDetectorRefs.detectChanges();
      }
    })

  }

  GetDSSlideMini() {
    this.product_services.GetDSSlideMini().subscribe((res: any) => {
      if (res) {
        this.listSlide = res.data;
        console.log("listSlide", this.listSlide)
        this.changeDetectorRefs.detectChanges();
      }
    })
  }
  GetDSBest() {
    this.product_services.GetDSBest().subscribe((res: any) => {
      if (res) {
        this.lstProductSeller = res.data;
        console.log("getListSPHome", this.listProduct)
        this.changeDetectorRefs.detectChanges();
      }
    })
  }
  ngOnInit(): void {
    this.getListSPHome();
    this.GetDSSlideMini()
    this.GetDSBest();
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  products: Array<any> = [];
  loading: any = {
    getting: false
  };

  constructor(
    public modal: ModalService,
    private toast: ToastService,
    private http: HttpService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetProducts() {
    this.loading.getting = true;
    this.http.Get(`Products/WithPriceHistory`).subscribe((products: any) => {
      this.products = products;
      console.log(products);
      this.loading.getting = false;
    }, err => {
      console.error("Error getting products", err);
      this.loading.getting = false;
    });
  }

}

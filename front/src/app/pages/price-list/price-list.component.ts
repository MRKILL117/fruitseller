import { Component, OnInit } from '@angular/core';
import { CsvService } from 'src/app/services/csv.service';
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
    private nav: NavigationService,
    private csv: CsvService
  ) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetProducts(filters: any = null) {
    let endpoint = `Products/WithPriceHistory`
    if(!!filters) endpoint += `/FilteredBy/Text/${filters.text}/StartDate/${filters.startDate}/EndDate/${filters.endDate}`;
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

  GenerateCsv() {
    let headers: any = ['Producto', 'Fecha', 'Precio de compra', 'Precio de venta'];
    let keys: any = ['product', 'date', 'purchasePrice', 'salePrice'];
    let prices: Array<any> = [];
    this.products.forEach(product => {
      prices = prices.concat(product.prices.map((price: any) => {
        return {
          product: product.name,
          date: price.date,
          purchasePrice: price.purchasePrice,
          salePrice: price.salePrice,
        }
      }));
    });
    this.csv.GenerateCSV("lista_de_precios", prices, keys, headers);
  }

}

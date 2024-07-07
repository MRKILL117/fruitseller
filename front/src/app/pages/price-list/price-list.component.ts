import { Component, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { filter } from 'src/app/common/data-types.interface';
import { CsvService } from 'src/app/services/csv.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  onShowHistory: EventEmitter<any> = new EventEmitter<any>();
  showingHistory: boolean = false;
  products: Array<any> = [];
  filters: Array<filter> = [];
  loading: any = {
    getting: false
  };

  constructor(
    public modal: ModalService,
    private toast: ToastService,
    private http: HttpService,
    private nav: NavigationService,
    private csv: CsvService
  ) {
    this.InitializeFilters();
  }

  ngOnInit(): void {
    this.GetProducts();
  }

  InitializeFilters() {
    // Text filter
    this.filters.push({
      type: 'text',
      name: 'text',
      placeholder: 'Buscar'
    });
    // Start date filter
    this.filters.push({
      type: 'datepicker',
      name: 'startDate',
      placeholder: 'Fecha de inicio',
      config: null
    });
    // End date filter
    this.filters.push({
      type: 'datepicker',
      name: 'endDate',
      placeholder: 'Fecha de fin',
      config: null
    });
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  FormatDate(date: string) {
    if(!!date && date != '*') {
      return moment(date).tz(environment.timezone).toISOString().split('T').shift();
    }
    return '*';
  }

  GetProducts(filters: any = null) {
    let endpoint = `Products/WithPriceHistory`;
    if(!!filters) endpoint += `/FilteredBy/Text/${filters.text}/StartDate/${this.FormatDate(filters.startDate)}/EndDate/${this.FormatDate(filters.endDate)}`;
    this.loading.getting = true;
    this.http.Get(endpoint).subscribe((products: any) => {
      this.products = products;
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

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
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

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
    let endpoint = `Products/WithInventory`;
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
    let headers: any = ['Producto', 'Fecha', 'Inventario'];
    let keys: any = ['product', 'date', 'quantity'];
    let inventories: Array<any> = [];
    this.products.forEach(product => {
      inventories = inventories.concat(product.inventories.map((inventory: any) => {
        return {
          product: product.name,
          date: inventory.date,
          quantity: inventory.quantity,
        }
      }));
    });
    this.csv.GenerateCSV("inventario", inventories, keys, headers);
  }

}

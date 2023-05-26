import { Component, EventEmitter, OnInit } from '@angular/core';
import { CsvService } from 'src/app/services/csv.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  onShowHistory: EventEmitter<any> = new EventEmitter<any>();
  showingHistory: boolean = false;
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
    let endpoint = `Products/WithInventory`;
    if(!!filters) endpoint += `/FilteredBy/Text/${filters.text}/StartDate/${filters.startDate}/EndDate/${filters.endDate}`;
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

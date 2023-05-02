import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-sell-order',
  templateUrl: './create-sell-order.component.html',
  styleUrls: ['./create-sell-order.component.css']
})
export class CreateSellOrderComponent implements OnInit {

  clients: Array<any> = [];
  orderDate: string = moment().tz(environment.timezone).format('YYYY-MM-DD');
  loading: any = {
    getting: false,
    creating: false
  }

  constructor(
    private http: HttpService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetClients();
  }

  GoBack() {
    this.nav.GoToRoleRoute(`sell-orders`);
  }

  GetClients(filters: any = null) {
    this.loading.getting = true;
    let endpoint = `/Clients`;
    if(!!filters) endpoint += `/FilteredBy/Text/${filters.text}`;
    this.http.Get(endpoint).subscribe((clients: any) => {
      this.clients = clients;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting clients", err);
      this.loading.getting = false;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any = null;
  pages: Array<any> = [
    {
      title: 'Clientes',
      route: 'clients',
      icon: 'zmdi-accounts',
    },
    {
      title: 'Productos',
      route: 'products',
      icon: 'zmdi-archive',
    },
    {
      title: 'Ordenes de venta',
      route: 'sell-orders',
      icon: 'zmdi-assignment-alert',
    },
    {
      title: 'Compras del día',
      route: 'daily-shopping',
      icon: 'zmdi-shopping-cart',
    },
    {
      title: 'Lista de precios',
      route: 'prices-list',
      icon: 'zmdi-money',
    },
    {
      title: 'Inventario',
      route: 'inventory',
      icon: 'zmdi-assignment',
    },
    {
      title: 'Facturación',
      route: 'invoicing',
      icon: 'zmdi-money-box',
    },
  ]

  constructor(
    public role: RoleService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
  }

}

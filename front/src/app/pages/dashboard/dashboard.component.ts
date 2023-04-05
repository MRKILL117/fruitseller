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
      icon: 'zmdi-accounts',
    },
    {
      title: 'Ordenes de venta',
      route: 'sell-orders',
      icon: 'zmdi-accounts',
    },
    {
      title: 'Compras del día',
      route: 'daily-shopping',
      icon: 'zmdi-accounts',
    },
    {
      title: 'Lista de precios',
      route: 'prices-list',
      icon: 'zmdi-accounts',
    },
    {
      title: 'Inventario',
      route: 'inventory',
      icon: 'zmdi-accounts',
    },
    {
      title: 'Facturación',
      route: 'invoicing',
      icon: 'zmdi-accounts',
    },
  ]

  constructor(
    public role: RoleService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
  }

}

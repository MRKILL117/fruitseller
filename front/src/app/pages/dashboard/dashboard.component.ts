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
      img: 'clients.jpg'
    },
    {
      title: 'Productos',
      route: 'products',
      icon: 'zmdi-archive',
      img: 'products.png'
    },
    {
      title: 'Compradores',
      route: 'buyers',
      icon: 'zmdi-walk',
      img: 'buyers.png'
    },
    {
      title: 'Ordenes de venta',
      route: 'sell-orders',
      icon: 'zmdi-assignment-alert',
      img: 'sell-order.jpg'
    },
    {
      title: 'Compras del día',
      route: 'daily-shopping-list',
      icon: 'zmdi-shopping-cart',
      img: 'shopping.jpg'
    },
    {
      title: 'Lista de precios',
      route: 'price-list',
      icon: 'zmdi-money',
      img: 'price-list.jpg'
    },
    {
      title: 'Cobranza',
      route: 'payments',
      icon: 'zmdi-balance',
      img: 'payments.jpg'
    },
    {
      title: 'Inventario',
      route: 'inventory',
      icon: 'zmdi-assignment',
      img: 'inventory.png'
    },
    {
      title: 'Facturación',
      route: 'invoicing',
      icon: 'zmdi-money-box',
      img: ''
    },
  ]

  constructor(
    public role: RoleService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
  }

}

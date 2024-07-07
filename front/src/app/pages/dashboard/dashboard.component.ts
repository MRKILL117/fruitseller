import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null;
  userPages: Array<any> = [];
  pages: Array<any> = [
    {
      title: 'Usuarios',
      route: 'users',
      icon: 'zmdi-accounts',
      roles: ['Admin'],
    },
    {
      title: 'Clientes',
      route: 'clients',
      icon: 'zmdi-accounts',
      roles: ['Admin'],
      img: 'clients.jpg'
    },
    {
      title: 'Productos',
      route: 'products',
      icon: 'zmdi-archive',
      roles: ['Admin', 'Capturist'],
      img: 'products.png'
    },
    {
      title: 'Compradores',
      route: 'buyers',
      icon: 'zmdi-walk',
      roles: ['Admin', 'Capturist'],
      img: 'buyers.png'
    },
    {
      title: 'Ordenes de venta',
      route: 'sell-orders',
      icon: 'zmdi-assignment-alert',
      roles: ['Admin', 'Capturist'],
      img: 'sell-order.jpg'
    },
    {
      title: 'Compras del día',
      route: 'daily-shopping-list',
      icon: 'zmdi-shopping-cart',
      roles: ['Admin', 'Buyer'],
      img: 'shopping.jpg'
    },
    {
      title: 'Entradas de mercancía',
      route: 'products-entrance',
      icon: 'zmdi-shopping-cart',
      roles: ['Admin'],
      img: 'shopping.jpg'
    },
    {
      title: 'Lista de precios',
      route: 'price-list',
      icon: 'zmdi-money',
      roles: ['Admin', 'Accountant', 'Buyer', 'Capturist'],
      img: 'price-list.jpg'
    },
    {
      title: 'Cobranza',
      route: 'payments',
      icon: 'zmdi-balance',
      roles: ['Admin'],
      img: 'payments.jpg'
    },
    {
      title: 'Inventario',
      route: 'inventory',
      icon: 'zmdi-assignment',
      roles: ['Admin', 'Capturist'],
      img: 'inventory.png'
    },
    {
      title: 'Facturación',
      route: 'invoicing',
      icon: 'zmdi-money-box',
      roles: ['Admin'],
      img: ''
    },
    {
      title: 'Configuración',
      route: 'settings',
      icon: 'zmdi-settings',
      roles: ['Admin'],
      img: ''
    },
  ]

  constructor(
    public role: RoleService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    const userRole = this.role.GetUserRole();
    this.userPages = this.pages.filter(page => page.roles.includes(userRole));
  }

}

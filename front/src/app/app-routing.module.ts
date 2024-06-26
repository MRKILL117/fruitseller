import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'Admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule) },
      { path: 'clients', loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsModule) },
      { path: 'clients/:clientId/addresses', loadChildren: () => import('./pages/client-addresses/client-addresses.module').then( m => m.ClientAddressesModule) },
      { path: 'products', loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsModule) },
      { path: 'buyers', loadChildren: () => import('./pages/buyers/buyers.module').then( m => m.BuyersModule) },
      { path: 'inventory', loadChildren: () => import('./pages/inventory/inventory.module').then( m => m.InventoryModule) },
      { path: 'price-list', loadChildren: () => import('./pages/price-list/price-list.module').then( m => m.PriceListModule) },
      { path: 'sell-orders', loadChildren: () => import('./pages/sell-orders/sell-orders.module').then( m => m.SellOrdersModule) },
      { path: 'edit-sell-orders/:orderId', loadChildren: () => import('./pages/sell-order/sell-order.module').then( m => m.SellOrderModule) },
      { path: 'sell-orders/create', loadChildren: () => import('./pages/create-sell-order/create-sell-order.module').then( m => m.CreateSellOrderModule) },
      { path: 'daily-shopping-list', loadChildren: () => import('./pages/daily-shopping-list/daily-shopping-list.module').then( m => m.DailyShoppingListModule) },
      { path: 'payments', loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsModule) },
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then( m => m.UsersModule) },
      { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsModule) },
    ]
  },
  {
    path: 'collector',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'Collector' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule) },
      { path: 'sell-orders', loadChildren: () => import('./pages/sell-orders/sell-orders.module').then( m => m.SellOrdersModule) },
      { path: 'payments', loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsModule) },
    ]
  },
  {
    path: 'accountant',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'Accountant' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule) }, 
      { path: 'price-list', loadChildren: () => import('./pages/price-list/price-list.module').then( m => m.PriceListModule) },
    ]
  },
  {
    path: 'buyer',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'Buyer' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule) },
      { path: 'price-list', loadChildren: () => import('./pages/price-list/price-list.module').then( m => m.PriceListModule) },
      { path: 'daily-shopping-list', loadChildren: () => import('./pages/daily-shopping-list/daily-shopping-list.module').then( m => m.DailyShoppingListModule) },
    ]
  },
  {
    path: 'capturist',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'Capturist' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule) },
      { path: 'products', loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsModule) },
      { path: 'buyers', loadChildren: () => import('./pages/buyers/buyers.module').then( m => m.BuyersModule) },
      { path: 'inventory', loadChildren: () => import('./pages/inventory/inventory.module').then( m => m.InventoryModule) },
      { path: 'price-list', loadChildren: () => import('./pages/price-list/price-list.module').then( m => m.PriceListModule) },
      { path: 'sell-orders', loadChildren: () => import('./pages/sell-orders/sell-orders.module').then( m => m.SellOrdersModule) },
      { path: 'edit-sell-orders/:orderId', loadChildren: () => import('./pages/sell-order/sell-order.module').then( m => m.SellOrderModule) },
      { path: 'sell-orders/create', loadChildren: () => import('./pages/create-sell-order/create-sell-order.module').then( m => m.CreateSellOrderModule) },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

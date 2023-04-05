import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './role.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private role: RoleService,
    private toast: ToastService
  ) { }

  private FormatRoute(route: string): string {
    if(route.charAt(0) == '/') return  `${route.split('').slice(1).join('')}`;
    else return route;
  }

  public GoToRoleRoute(route: string) {
    const role = this.role.GetUserRole();
    if(!!role) this.router.navigate([`/${role.toLowerCase()}/${this.FormatRoute(route)}`]);
    else {
      this.toast.ShowDefaultDanger(`Rol de usuario no valido`, `Ruta invalida`);
    }
  }

}

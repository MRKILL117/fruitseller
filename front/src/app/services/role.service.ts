import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  public GetUserRole(): any {
    let userStored = localStorage.getItem('user');
    if(userStored != null) {
      const user: any = JSON.parse(userStored);
      if(user && user.role) return user.role.name;
    }
    return null;
  }
}

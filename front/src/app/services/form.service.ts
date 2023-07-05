import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public GetFormControlByName(form: FormGroup, formControlName: string): any {
    return form.get(formControlName);
  }

  public BuildAddress(address: any, full: boolean): string {
    let addressText = `${address.street} #${address.externalNumber} ${(!!address.internalNumber ? (`" int. ${address.internalNumber}`) : ``)}`;
    if(full) addressText += ``;
    return addressText;
  }
}

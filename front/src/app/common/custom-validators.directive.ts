import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchString(stringToMatch: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(!value) return null;
    if(stringToMatch == control.value) return null;
    return {matchstring: stringToMatch};
  }
}

export function onlyNumbers(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(!value) return null;
    if(/^[0-9]*$/.test(value)) return null;
    return {onlynumbers: 'format invalid'};
  }
}

export function priceNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(!value) return null;
    if(/^[0-9]{1,}(\.[0-9]{1,2})?$/.test(value)) return null;
    return {procenumber: 'format invalid'};
  }
}

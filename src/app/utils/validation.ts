import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface PasswordValidationOptions {
  minLength?: number;
  minLowercase?: number;
  minUppercase?: number;
  minNumbers?: number;
  minSymbols?: number;
  maxLength?: number;
}

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static passwordValidator(options: PasswordValidationOptions): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      const minLength = options.minLength || 8; // Default minimum length
      const minLowercase = options.minLowercase || 0;
      const minUppercase = options.minUppercase || 0;
      const minNumbers = options.minNumbers || 0;
      const minSymbols = options.minSymbols || 0;
      const maxLength = options.maxLength || 30;
  
      const value = control.value;
  
      if (value.length < minLength) {
        errors['minLength'] = `Minimum length is ${minLength} characters.`;
      }
      if (value.length > maxLength) {
        errors['maxLength'] = `Too long.`;
      }
  
      const lowercaseRegex = /[a-z]/g;
      const lowercaseCount = (value.match(lowercaseRegex) || []).length;
      if (lowercaseCount < minLowercase) {
        errors['minLowercase'] = `Minimum ${minLowercase} lowercase letters required.`;
      }
  
      const uppercaseRegex = /[A-Z]/g;
      const uppercaseCount = (value.match(uppercaseRegex) || []).length;
      if (uppercaseCount < minUppercase) {
        errors['minUppercase'] = `Minimum ${minUppercase} uppercase letters required.`;
      }
  
      const numberRegex = /\d/g;
      const numberCount = (value.match(numberRegex) || []).length;
      if (numberCount < minNumbers) {
        errors['minNumbers'] = `Minimum ${minNumbers} numbers required.`;
      }
  
      const symbolRegex = /[^\w\s]/g;
      const symbolCount = (value.match(symbolRegex) || []).length;
      if (symbolCount < minSymbols) {
        errors['minSymbols'] = `Minimum ${minSymbols} symbols required.`;
      }
  
      return Object.keys(errors).length > 0 ? errors : null;
    };
  };
  
}

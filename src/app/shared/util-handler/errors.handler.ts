import { FormGroup } from '@angular/forms';

export function getFieldError(form: FormGroup, field: string): string | null {
  if (!form.controls[field]) return null;

  const errors = form.controls[field].errors || {};

  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'Este campo es requerido';

      case 'min':
        return `Este campo puede valer como mínimo ${errors['min'].min}`;

      case 'max':
        return `Este campo puede valer como máximo ${errors['max'].max}`;

      case 'minlength':
        return `Este campo requiere al menos ${errors['minlength'].requiredLength} caracteres`;

      case 'maxlength':
        return `Este campo tiene como longitud máxima ${errors['maxlength'].requiredLength} caracteres`;
    }
  }
  return null;
}

export function ngErrorClass(form: FormGroup, field: string): string {
  return form.get(field)!.touched && form.get(field)!.invalid
    ? 'ng-dirty ng-invalid'
    : '';
}

import { FormGroup } from '@angular/forms';

export function showErrors(form: FormGroup) {
  for (const controlName in form.controls) {
    if (form.controls.hasOwnProperty(controlName)) {
      const control = form.get(controlName);
      if (control && control.errors) {
        // Do something with the control's errors
        console.log(`Control ${controlName} has errors:`, control.errors);
      }
    }
  }
}

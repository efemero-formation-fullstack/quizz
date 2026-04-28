import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forms-error-display',
  imports: [],
  templateUrl: './forms-error-display.html',
  styleUrl: './forms-error-display.css',
})
export class FormsErrorDisplay {
  control = input.required<AbstractControl<any, any, any>>();
  name = input.required<string>();
}

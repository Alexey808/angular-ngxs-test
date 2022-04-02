import { FormControl, FormGroup, Validators } from '@angular/forms';

export enum ItemFields {
  name = 'name',
  bool = 'bool',
}

export class ItemsForm {
  form: FormGroup = new FormGroup({
    [ItemFields.name]: new FormControl('', [Validators.required]),
    [ItemFields.bool]: new FormControl(false, []),
  });
}

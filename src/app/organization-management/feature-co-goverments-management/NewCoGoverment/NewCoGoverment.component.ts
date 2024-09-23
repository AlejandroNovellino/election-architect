import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  getFieldError,
  ngErrorClass,
} from '@shared/util-handler/errors.handler';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { NewCoGovermentFacadeService } from './../data';

@Component({
  selector: 'app-new-co-goverment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,
    InputTextareaModule,
    DividerModule,
  ],
  templateUrl: './NewCoGoverment.component.html',
})
export default class NewCoGovermentComponent {
  // injectors
  newCoGovermentFacadeService = inject(NewCoGovermentFacadeService);
  messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);
  private location = inject(Location);

  // forms
  newElectiveOffices: FormArray = this.formBuilder.array([
    this.formBuilder.group({
      office: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
      electors: [null, [Validators.required]],
      candidates: [null, [Validators.required]],
    }),
  ]);

  newCoGovermentForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: [null, []],
    votingType: ['', [Validators.required]],
    coGovermentType: ['', [Validators.required]],
    dependency: ['', [Validators.required]],
    electiveOffices: [this.newElectiveOffices, [Validators.required]],
  });

  goBack(): void {
    // got back
    this.location.back();
    // reset the form
    this.newCoGovermentForm.reset();
  }

  getControlAsFormGroup(): FormGroup[] {
    return this.newElectiveOffices.controls as FormGroup[];
  }

  getElectiveOfficesAsList() {
    let elementList = [];
    for (let formGroup of this.getControlAsFormGroup()) {
      elementList.push({
        id: '0',
        office: formGroup.controls['office'].value,
        amount: formGroup.controls['amount'].value,
        electors: formGroup.controls['electors'].value,
        candidates: formGroup.controls['candidates'].value,
      });
    }

    return elementList;
  }

  onCreateNewCoGoverment(): void {
    console.log(this.newCoGovermentForm.controls);
    // verify if the form is valid
    if (this.newCoGovermentForm.valid && this.newElectiveOffices.valid) {
      console.log('Is valid');
      // add the new co goverment
      this.newCoGovermentFacadeService.addNewCoGoverment({
        id: '10',
        name: this.newCoGovermentForm.controls['name'].value,
        description: this.newCoGovermentForm.controls['description'].value,
        votingType: this.newCoGovermentForm.controls['votingType'].value,
        coGovermentType:
          this.newCoGovermentForm.controls['coGovermentType'].value,
        dependency: this.newCoGovermentForm.controls['dependency'].value,
        electiveOffices: this.getElectiveOfficesAsList(),
      });
      // go back
      this.goBack();
      // set the message on the toast
      this.messageService.add({
        key: 'coGovermentToast',
        severity: 'success',
        summary: 'Creación exitosa',
        detail: 'Co-Gobierno creado con éxito',
      });
    } else {
      // mark all as touched to show the requirements
      this.newCoGovermentForm.markAllAsTouched();
      this.newElectiveOffices.markAllAsTouched();
      console.log('Is invalid');
    }
  }

  newForm(): void {
    // add a new form to the offices form array
    this.newElectiveOffices.push(
      this.formBuilder.group({
        office: ['', [Validators.required]],
        amount: [null, [Validators.required, Validators.min(1)]],
        electors: [[], [Validators.required]],
        candidates: [[], [Validators.required]],
      })
    );
  }

  deleteForm(): void {
    // delete the last form
    if (this.newElectiveOffices.length) {
      this.newElectiveOffices.removeAt(this.newElectiveOffices.length - 1);
    }
  }

  getFieldError(formGroup: FormGroup, field: string): string | null {
    return getFieldError(formGroup, field);
  }

  ngErrorClass(formGroup: FormGroup, field: string): string {
    return ngErrorClass(formGroup, field);
  }

  ngOnInit(): void {
    // update the data of the service
    this.messageService.add({
      severity: 'success',
      summary: 'Creación exitosa',
      detail: 'Co-Gobierno creado con éxito',
    });
    this.newCoGovermentFacadeService.getData();
  }
}

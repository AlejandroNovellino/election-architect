import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
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
import { BallotCreatorFacadeService } from '../../data/services';
import { EditorModule } from 'primeng/editor';
import { Office } from '../../data/interfaces';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SortType } from '../../data/enums';

@Component({
  selector: 'app-ballot-creator',
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
    InputTextModule,
    EditorModule,
    RadioButtonModule,
  ],
  templateUrl: './BallotCreator.component.html',
  styleUrl: './BallotCreator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BallotCreatorComponent implements OnInit {
  // injectors
  readonly ballotCreatorFacadeService = inject(BallotCreatorFacadeService);
  readonly messageService = inject(MessageService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly location = inject(Location);

  // * signals
  public electiveOffices: WritableSignal<Office[]> = signal([]);

  // * forms info
  private readonly newChargeInBallotBuilder = {
    // basic info
    description: [null, []],
    // options to organice the charges
    sortType: ['', [Validators.required]],
    // sortByName: [false, [Validators.required]],
    // sortByLastName: [false, [Validators.required]],
    // sortRandom: [false, Validators.required],
    // options for votes
    allowAbstain: [false, [Validators.required]],
    // TODO verify min, length, etc
    //amountOfVotes: [null, [Validators.required, Validators.min(1)]],
  };

  //charges in ballot form
  // * Charges for the election and their design and rules
  newChargesInBallotForm: FormArray = this.formBuilder.array([]);
  // new ballot form
  // * options for the ballot as a whole
  newBallotForm: FormGroup = this.formBuilder.group({
    // electoral event of the ballot
    electoralEventAssignedId: [null, [Validators.required]],
    // basic info
    name: ['', [Validators.required, Validators.maxLength(100)]],
    infoAndInstructions: [null, [Validators.required]],
    // TODO put this options
    // showOrganizationLogo: [false, [Validators.required]],
    // // colors
    // buttonsColor: ['', [Validators.required]],
    // menuBarColor: ['', [Validators.required]],
    // // review and confirmation
    // ballotReviewMessage: ['', [Validators.required]],
    // ballotConfirmationMessage: ['', Validators.required],
  });

  // methods
  handleSelectElectoralEvent() {
    const electoralEventId =
      this.newBallotForm.controls['electoralEventAssignedId'].value;

    // if nothing selected skip
    if (!electoralEventId || electoralEventId == '') return;

    // if an electoral event is selected get it elected offices
    this.ballotCreatorFacadeService
      .getChargesForElectoralEvent(electoralEventId)
      .subscribe((res) => {
        // update the signal
        this.electiveOffices.set(res);
        // update the forms array
        this.updateFormArray();
      });
  }

  goBack(): void {
    // got back
    this.location.back();
    // reset the form
    this.newBallotForm.reset();
  }

  getControlAsFormGroup(): FormGroup[] {
    return this.newChargesInBallotForm.controls as FormGroup[];
  }

  getElectiveOfficesAsList() {
    let elementList = [];
    for (let formGroup of this.getControlAsFormGroup()) {
      elementList.push({
        id: '0',
        description: formGroup.controls['description'].value,
        sortType: formGroup.controls['sortType'].value,
        allowAbstain: formGroup.controls['allowAbstain'].value,
      });
    }

    return elementList;
  }

  onCreateNewBallot(): void {
    console.log(this.newBallotForm.controls);
    // verify if the form is valid
    if (this.newBallotForm.valid && this.newChargesInBallotForm.valid) {
      console.log('Is valid');
      console.log(this.newBallotForm.controls);
      console.log(this.getElectiveOfficesAsList());
      // add the new co goverment
      this.ballotCreatorFacadeService.createBallot({
        id: '10',
        name: this.newBallotForm.controls['name'].value,
        description: this.newBallotForm.controls['description'].value,
        votingType: this.newBallotForm.controls['votingType'].value,
        coGovermentType: this.newBallotForm.controls['coGovermentType'].value,
        dependency: this.newBallotForm.controls['dependency'].value,
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
      this.newBallotForm.markAllAsTouched();
      this.newChargesInBallotForm.markAllAsTouched();
      console.log('Is invalid');
    }
  }

  newForm(): void {
    // add a new form to the offices form array
    this.newChargesInBallotForm.push(
      this.formBuilder.group({
        ...this.newChargeInBallotBuilder,
      })
    );
  }

  updateFormArray() {
    // update the forms
    // first clear
    this.newChargesInBallotForm.clear();
    // now add all the items
    this.electiveOffices().forEach(() => this.newForm());
  }

  deleteForm(): void {
    // delete the last form
    if (this.newChargesInBallotForm.length) {
      this.newChargesInBallotForm.removeAt(
        this.newChargesInBallotForm.length - 1
      );
    }
  }

  getRadioButtonValue(value: string) {
    switch (value) {
      case SortType.byLastName:
        return SortType.byLastName;

      case SortType.byName:
        return SortType.byName;

      case SortType.random:
        return SortType.random;

      default:
        return SortType.byName;
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
    this.ballotCreatorFacadeService.getData();
  }
}

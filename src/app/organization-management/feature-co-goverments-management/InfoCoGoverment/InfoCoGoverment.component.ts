import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CoGovermentService } from './../../data/services';

@Component({
  selector: 'app-info-co-goverment',
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
  templateUrl: './InfoCoGoverment.component.html',
})
export default class InfoCoGovermentComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private coGovermentService = inject(CoGovermentService);
  private location = inject(Location);
  // signals
  coGoverment = computed(() => {
    let id = this.activatedRoute.snapshot.params['id'];
    return this.coGovermentService.getById(id);
  });

  goBack(): void {
    // got back
    this.location.back();
  }

  ngOnInit(): void {
    console.log(
      `🚀 ~ InfoCoGovermentComponent ~ coGoverment=computed ~ coGoverment:`,
      this.coGoverment()
    );
  }
}

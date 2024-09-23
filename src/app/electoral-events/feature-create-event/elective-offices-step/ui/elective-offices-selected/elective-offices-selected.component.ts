import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ElectiveOfficeByCoGoverment } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'elective-offices-selected',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './elective-offices-selected.component.html',
  styles: ``,
})
export class ElectiveOfficesSelectedComponent {
  public currentSelection = input<ElectiveOfficeByCoGoverment[]>([]);

  public onRemoveCharges = output<ElectiveOfficeByCoGoverment>();

  public removeCharges(charges: ElectiveOfficeByCoGoverment): void {
    this.onRemoveCharges.emit(charges);
  }
}

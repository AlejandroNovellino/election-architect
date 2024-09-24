import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../data/services/layout.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  constructor(public layoutService: LayoutService, public el: ElementRef) {}
}

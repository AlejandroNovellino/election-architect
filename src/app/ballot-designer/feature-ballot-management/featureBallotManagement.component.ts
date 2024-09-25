import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-feature-ballot-management',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './featureBallotManagement.component.html',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FeatureBallotManagementComponent {}

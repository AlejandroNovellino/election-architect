import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ballot-creator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './BallotCreator.component.html',
  styleUrl: './BallotCreator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BallotCreatorComponent {}

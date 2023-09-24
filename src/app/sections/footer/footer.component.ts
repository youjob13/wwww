import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'chirk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoModule],
})
export class FooterComponent {
  @HostBinding('id') readonly id = 'contacts';
}

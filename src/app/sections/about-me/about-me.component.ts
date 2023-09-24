import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { SvgAnimationDirective } from 'src/app/common/svg-animation.directive';

@Component({
  selector: 'chirk-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoModule],
})
export class AboutMeComponent extends SvgAnimationDirective {
  @HostBinding('id') readonly id = 'me';
}

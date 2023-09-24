import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { SvgAnimationDirective } from 'src/app/common/svg-animation.directive';

@Component({
  selector: 'chirk-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, TranslocoModule],
})
export class CertificatesComponent extends SvgAnimationDirective {
  @HostBinding('id') readonly id = 'certificates';

  public readonly slides: Array<string> = [
    './assets/certificate.jpg',
    './assets/certificate_2.jpg',
  ];
}

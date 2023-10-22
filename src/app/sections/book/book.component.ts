import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

interface IService {
  name: string;
  price: string;
}

@Component({
  selector: 'chirk-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoModule],
})
export class BookComponent {
  @HostBinding('id') readonly id = 'price';

  public readonly services: Array<IService> = [
    { name: 'Маникюр + покрытие (от 35€)', price: '35€' },
    { name: 'Маникюр (от 25€)', price: '$45' },
    { name: 'Наращивание ногтей 1-2 (от 45€)', price: '$65' },
    { name: 'Наращивание ногтей 3-4 (от 55€)', price: '$65' },
  ];
}

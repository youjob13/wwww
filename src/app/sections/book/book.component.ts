import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

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
  imports: [CommonModule],
})
export class BookComponent {
  public readonly services: Array<IService> = [
    { name: 'Nails', price: '$25' },
    { name: 'Наращивание', price: '$45' },
    { name: 'Супер пупер ноготочки', price: '$65' },
  ];

  @HostBinding('id') readonly id = 'schedule-appointment';
}

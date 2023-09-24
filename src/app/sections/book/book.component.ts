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
  @HostBinding('id') readonly id = 'book';

  public readonly services: Array<IService> = [
    { name: 'Nails', price: '$25' },
    { name: 'Super nails', price: '$45' },
    { name: 'Puper nails', price: '$65' },
  ];
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Renderer2,
  inject,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'chirk-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoModule],
})
export class ExamplesComponent {
  @HostBinding('id') readonly id = 'examples';

  private readonly renderer = inject(Renderer2);

  public readonly images = [
    'assets/examples/1.jpg',
    'assets/examples/2.jpg',
    'assets/examples/3.jpg',
    'assets/examples/4.jpg',
    'assets/examples/5.jpg',
    'assets/examples/6.jpg',
  ];

  public openOnFullscreen(element: Element) {
    element.requestFullscreen();
    this.renderer.addClass(element, 'fullscreen');
  }
}

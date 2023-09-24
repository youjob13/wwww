import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { calcScrollPercentage } from 'src/app/common/utils';

@Component({
  selector: 'chirk-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslocoModule],
  standalone: true,
})
export class MainComponent implements AfterViewInit {
  @ViewChild('myTitle', { static: true }) titleRef: ElementRef | undefined;
  @ViewChild('subtitle', { static: true }) subtitle: ElementRef | undefined;

  public readonly title = 'Annushka nails 🤍';
  private readonly FACTOR = 5;

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private wrapper: Element | null = null;

  ngAfterViewInit(): void {
    this.wrapper = this.document.querySelector('.inner-body');

    this.wrapper?.addEventListener('scroll', this.hideTextOnScroll.bind(this));
  }

  private hideTextOnScroll(): void {
    if (
      this.wrapper == null ||
      this.titleRef == null ||
      this.subtitle == null
    ) {
      return;
    }

    const scrollPercentage = calcScrollPercentage(this.wrapper, this.document);

    this.setStyle(this.titleRef.nativeElement, scrollPercentage);
    this.setStyle(this.subtitle.nativeElement, scrollPercentage);
  }

  private setStyle(element: any, scrollPercentage: number) {
    const scaleValue = 1 - scrollPercentage * this.FACTOR;

    if (scaleValue < 0) {
      return;
    }

    this.renderer.setStyle(element, 'transform', `scale(${scaleValue})`);
  }
}

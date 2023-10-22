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
import { TranslocoModule } from '@ngneat/transloco';
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
  @ViewChild('nailsRef', { static: true }) nailsRef: ElementRef | undefined;
  @ViewChild('polishRef', { static: true }) polishRef: ElementRef | undefined;

  public readonly title = 'Annushka nails 🤍';
  private readonly FACTOR = 5;

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private wrapper: Element | null = null;

  constructor() {}

  public makeRequest() {
    window.open('https://web.telegram.org/k/#@annushka_nails_bot', '_blank');
  }

  ngAfterViewInit(): void {
    this.wrapper = this.document.querySelector('.inner-body');

    this.wrapper?.addEventListener('scroll', this.hideTextOnScroll.bind(this));
  }

  private hideTextOnScroll(): void {
    if (
      this.wrapper == null ||
      this.titleRef == null ||
      this.subtitle == null ||
      this.nailsRef == null ||
      this.polishRef == null
    ) {
      return;
    }

    const scrollPercentage = calcScrollPercentage(this.wrapper, this.document);

    this.setScaleStyle(this.titleRef.nativeElement, scrollPercentage);
    this.setScaleStyle(this.subtitle.nativeElement, scrollPercentage);
    this.setScaleStyle(this.polishRef.nativeElement, scrollPercentage, 7.5);
    this.setScaleStyle(this.nailsRef.nativeElement, scrollPercentage, 10);
  }

  private setScaleStyle(
    element: any,
    scrollPercentage: number,
    factor: number = this.FACTOR
  ) {
    this.setStyle({
      element,
      scrollPercentage,
      property: 'transform',
      value: `scale`,
      factor,
    });
  }

  private setStyle({
    element,
    scrollPercentage,
    property,
    factor,
    value,
  }: {
    element: any;
    scrollPercentage: number;
    property: string;
    factor?: number;
    value?: string;
  }) {
    const scaleValue = 1 - scrollPercentage * (factor || this.FACTOR);

    if (scaleValue < 0) {
      return;
    }

    this.renderer.setStyle(
      element,
      property,
      value != null ? `${value}(${scaleValue})` : scaleValue
    );
  }
}

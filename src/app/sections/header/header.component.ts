import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { LanguageTranslateService } from 'src/app/common/language-translate.service';
import { calcScrollPercentage } from 'src/app/common/utils';

@Component({
  selector: 'chirk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('hiddenToggler', { static: true }) hiddenToggler:
    | ElementRef
    | undefined;

  public readonly languageTranslateService = inject(LanguageTranslateService);
  private readonly document = inject(DOCUMENT);
  private wrapper: Element | null = null;

  ngAfterViewInit(): void {
    this.wrapper = this.document.querySelector('.inner-body');
    this.wrapper?.addEventListener('scroll', this.hideMenuOnScroll.bind(this));
  }

  public changeLanguage(): void {
    this.languageTranslateService.changeLanguage();
  }

  private hideMenuOnScroll(): void {
    if (this.wrapper == null) {
      return;
    }

    const scrollPercentage = calcScrollPercentage(this.wrapper, this.document);

    if (
      scrollPercentage > 0.02 &&
      this.hiddenToggler?.nativeElement.checked === true
    ) {
      this.hideMenu();
    }
  }

  public scrollToSection(target: string) {
    this.hideMenu();
    this.document.getElementById(target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  private hideMenu(): void {
    this.hiddenToggler?.nativeElement.click();
  }
}

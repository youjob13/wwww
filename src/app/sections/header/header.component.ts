import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { LanguageTranslateService } from 'src/app/common/language-translate.service';

@Component({
  selector: 'chirk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {
  @ViewChild('hiddenToggler', { static: true }) hiddenToggler:
    | ElementRef
    | undefined;

  public readonly languageTranslateService = inject(LanguageTranslateService);
  private readonly document = inject(DOCUMENT);

  public changeLanguage(): void {
    this.languageTranslateService.changeLanguage();
  }

  public scrollToSection(target: string) {
    this.document.getElementById(target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}

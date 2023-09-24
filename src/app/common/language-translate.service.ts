import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageTranslateService {
  private readonly translocoService = inject(TranslocoService);

  private currentLanguage =
    window.navigator.languages.find((lang) => ['en', 'de'].includes(lang)) ||
    'en';

  public get language(): string {
    return this.currentLanguage;
  }

  public changeLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
    this.translocoService.setActiveLang(this.currentLanguage);
  }
}

import { inject, Injectable, isDevMode } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(
      `${
        !isDevMode() ? 'https://youjob13.github.io/wwww' : ''
      }/assets/i18n/${lang}.json`
    );
  }
}

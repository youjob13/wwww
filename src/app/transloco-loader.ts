import { inject, Injectable, isDevMode } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return fetch(
      `${
        !isDevMode() ? 'https://youjob13.github.io/wwww' : ''
      }/assets/i18n/${lang}.json`
    ).then<Translation>((res) => res.json());
    // return this.http.get<any>(`/assets/i18n/${lang}.json`).pipe(
    //   map((res) => {
    //     console.log('res', res);
    //     return res;
    //   })
    // );
  }
}

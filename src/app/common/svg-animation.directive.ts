import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, Input, inject } from '@angular/core';

@Directive()
export abstract class SvgAnimationDirective implements AfterViewInit {
  @Input({ required: true }) public classQuery: string = '';
  @Input() public factor: number = 1;

  private paths: NodeListOf<SVGPathElement> | null = null;

  private readonly document = inject(DOCUMENT);
  private wrapper: Element | null = null;

  ngAfterViewInit(): void {
    this.paths = this.document.querySelectorAll(`.${this.classQuery} path`);
    this.wrapper = this.document.querySelector('.inner-body');

    this.wrapper?.addEventListener('scroll', this.fillSvgPaths.bind(this));
  }

  private fillSvgPaths(): void {
    if (this.wrapper == null || this.paths == null) {
      return;
    }

    const scrollPercentage =
      (this.wrapper.scrollTop + this.document.body.scrollTop) /
      (this.wrapper.scrollHeight - this.wrapper.clientHeight);

    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];

      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = String(pathLength);
      path.style.strokeDashoffset = String(pathLength);

      const drawLength = pathLength * scrollPercentage;

      path.style.strokeDashoffset = String(
        pathLength - drawLength * this.factor
      );
    }
  }
}

import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, Input, inject } from '@angular/core';
import { calcScrollPercentage } from './utils';

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

    this.drawStoke(this.paths, 0);
    this.addTransition(this.paths);
    this.wrapper?.addEventListener('scroll', this.fillSvgPaths.bind(this));
  }

  private fillSvgPaths(): void {
    if (this.wrapper == null || this.paths == null) {
      return;
    }

    const scrollPercentage = calcScrollPercentage(this.wrapper, this.document);

    this.drawStoke(this.paths, scrollPercentage);
  }

  private addTransition(paths: NodeListOf<SVGPathElement>): void {
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      path.style.transition = `stroke-dashoffset 1s`;
    }
  }

  private drawStoke(
    paths: NodeListOf<SVGPathElement>,
    scrollPercentage: number
  ): void {
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      const pathLength = path.getTotalLength();

      this.resetStroke(path, pathLength);

      const drawLength = pathLength * scrollPercentage;

      path.style.strokeDashoffset = String(
        pathLength - drawLength * this.factor
      );
    }
  }

  private resetStroke(path: SVGPathElement, pathLength: number): void {
    path.style.strokeDasharray = String(pathLength);
    path.style.strokeDashoffset = String(pathLength);
  }
}

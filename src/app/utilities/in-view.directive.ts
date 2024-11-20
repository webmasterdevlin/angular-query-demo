import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

// This directive is used to detect when an element is in view
@Directive({
  selector: '[appInView]',
})
export class InViewDirective implements OnDestroy {
  @Output() inView = new EventEmitter<void>();

  private observer: IntersectionObserver;

  constructor(private element: ElementRef) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.inView.emit();
        }
      });
    });

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}

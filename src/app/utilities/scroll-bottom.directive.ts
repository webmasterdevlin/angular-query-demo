import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

// This directive is used to detect when the user has scrolled to the bottom of the page
@Directive({
  standalone: true,
  selector: '[appScrollBottom]',
})
export class ScrollBottomDirective {
  @Output() scrolledToBottom = new EventEmitter<void>();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const maxScrollPosition = document.documentElement.scrollHeight;

    if (scrollPosition >= maxScrollPosition) {
      this.scrolledToBottom.emit();
    }
  }
}

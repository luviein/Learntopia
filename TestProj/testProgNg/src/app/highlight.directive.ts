import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appHighlight(condition: boolean) {
    if (condition) {
      this.renderer.addClass(this.el.nativeElement, 'highlighted');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'highlighted');
    }
  }
}

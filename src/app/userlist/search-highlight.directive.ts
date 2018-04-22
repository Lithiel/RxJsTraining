import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSearchHighlight]'
})
export class SearchHighlightDirective implements OnInit {

  private _text: string;

  @Input()
  set text(value: string) {
    this._text = value;
    this.highlight(this._text);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  private highlight(text: string) {
    if (text) {
      const regex = new RegExp(text, 'g');
      const newName = this.el.nativeElement.textContent.replace(regex, `<span style="color: aqua">${text}</span>`);
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', newName);
    } else {
      console.log(this.el.nativeElement);
      const textString = this.el.nativeElement.textContent;
      console.log(textString);
      // this.renderer.setProperty(this.el.nativeElement, 'innerHTML', textString);
    }
  }
}

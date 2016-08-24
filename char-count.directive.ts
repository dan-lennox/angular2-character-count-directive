import {OnInit, Directive, ElementRef, Renderer} from '@angular/core';

/**
 * Define the CharCount Directive.
 */
@Directive({
  selector: '[charCount]',
  inputs: ['limit:charCount'],
  host: {
    '(keyup)': '_onKeyUp()',
  }
})
/**
 * CharCount Class.
 */
export class CharCount implements OnInit {
  // Default character limit if none is supplied.
  private _defaultLimit: number = 200;
  // The character limit input variable.
  private _limit: number;
  // A html nativeElement (span) to display the character count.
  private _countDisplay: any;

  /**
   * Class constructor.
   *
   * @param { ElementRef } _elRef
   *   An ElementRef object instance.
   * @param { Renderer } _renderer
   *   A Renderer object instance.
   */
  constructor(private _elRef: ElementRef, private _renderer: Renderer) {}

  /**
   * Handle keyup events from the host component.
   */
  private _onKeyUp() {
    // When the field on the host is updated. Update the count display.
    let count: any = this._elRef.nativeElement.value.length;
    this._renderer.setText(this._countDisplay, (this._limit - count) + ' remaining.');
    // Set the colour of the count to red if the count exceeds the limit.
    if (count > this._limit) {
      this._renderer.setElementStyle(this._countDisplay, 'color', 'red');
    }
    else {
      this._renderer.setElementStyle(this._countDisplay, 'color', 'inherit');
    }
  }

  /**
   * Implements the OnInit Angular2 lifecycle hook.
   */
  ngOnInit():any {
    // If no character limit was supplied via input, then use the default limit.
    this._limit = this._limit || this._defaultLimit;
    // Inititalise a new <span> element for the count display and render it below the host component.
    this._countDisplay = this._renderer.createElement(this._elRef.nativeElement.parentElement, 'span');
    // Set the count display to the string length value of the host component.
    this._renderer.createText(this._countDisplay, (this._limit - this._elRef.nativeElement.value.length) + ' remaining.');
  }
}
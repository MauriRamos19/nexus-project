import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Button',
  template: `
    <button 
    (mouseup)="active=false" 
    (mousedown)="active=true" 
    (mouseenter)="hover=true" 
    (mouseleave)="hover=false" 
    [ngStyle]=" hover ? {'background': btnBgColorHover} : {'background': btnBgColor}" 
    [ngStyle]="active ? {'box-shadow': 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)', 'background': btnBgColor } : hover ? {'background': btnBgColorHover} : {'background': btnBgColor}" 
    style="border-radius: 8px; font-weight: bold;"
    [style.color]="btnColor" 
    [style.border]="btnBorder" 
    [style.width]="btnWidth" 
    [style.padding]="btnpadding"
    (click)="onClickButton($event)" 
    >{{btnText}}</button>
  `,
})

export class ButtonComponent implements OnInit {

  @Input() btnText :String= '';
  @Input() btnWidth: String = '250px';
  @Input() btnpadding: String = '10px 10px'
  @Input() btnBgColor = ''
  @Input() btnColor = ''
  @Input() btnBgColorHover = ''
  @Input() btnBorder = ''
  @Output() onClick = new EventEmitter<any>();

  hover = false
  active = false

  onClickButton(event: any) {
    this.onClick.emit(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ownid',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnidComponent implements OnInit {
  @Input() type: string | null = null;

  @Output() onLogin = new EventEmitter();

  @Output() onRegister = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore-next-line
    window.ownid!.init({
      statusInterval: 3000,
      URLPrefix: "/netcore3/ownid",
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore-next-line
    window.ownid!.render({
      element: this.elRef.nativeElement,
      type: this.type,
      onLogin: this.onLogin.emit.bind(this.onLogin),
      onRegister: this.onRegister.emit.bind(this.onRegister),
    });
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Output,
  EventEmitter, OnDestroy
} from "@angular/core";
import WidgetComponent from '../../../assets/ownid-web-ui-sdk/components/widget.component';

@Component({
  selector: "ownid",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnidComponent implements OnInit, OnDestroy {
  @Input() type: string | null = null;

  @Output() onLogin = new EventEmitter();

  @Output() onRegister = new EventEmitter();

  @Output() onLink = new EventEmitter();

  private ownidWidget: WidgetComponent | undefined;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    // @ts-ignore-next-line
    window.ownid!.init({
      statusInterval: 3000,
      URLPrefix: "/netcore3/ownid"
    });

    if (this.type === 'link') {
      // @ts-ignore-next-line
      this.ownidWidget = window.ownid!.renderLinkGigya({
        element: this.elRef.nativeElement,
        type: this.type,
        onLogin: this.onLogin.emit.bind(this.onLogin),
        onRegister: this.onRegister.emit.bind(this.onRegister),
        onLink: this.onLink.emit.bind(this.onLink),
      }, '3_4dA7nagT-27tI2ZgZ080PZr_ahnMWgoX5Iv2I-PjM7AkT1aEac8zvz2zpj2V2tmX');
    }
    else {
      // @ts-ignore-next-line
      this.ownidWidget = window.ownid!.render({
        element: this.elRef.nativeElement,
        type: this.type,
        onLogin: this.onLogin.emit.bind(this.onLogin),
        onRegister: this.onRegister.emit.bind(this.onRegister),
        onLink: this.onLink.emit.bind(this.onLink),
      });
    }
  }

  ngOnDestroy() {
    this.ownidWidget?.destroy();
  }
}

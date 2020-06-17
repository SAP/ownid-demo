import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import WidgetComponent from "../../../assets/ownid-web-ui-sdk/components/widget.component";
import { environment } from "../../../environments/environment";

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

  async ngOnInit() {
    // @ts-ignore-next-line
    window.ownid!.init({
      statusInterval: 3000,
      URLPrefix: "/netcore3/ownid"
    });

    if (this.type === "link") {
      // @ts-ignore-next-line
      this.ownidWidget = await window.ownid!.renderLinkGigya(
        {
          element: this.elRef.nativeElement,
          type: this.type,
          onLogin: this.onLogin.emit.bind(this.onLogin),
          onRegister: this.onRegister.emit.bind(this.onRegister),
          onLink: this.onLink.emit.bind(this.onLink)
        },
        environment.gigyaApiKey
      );
    } else {
      // @ts-ignore-next-line
      this.ownidWidget = window.ownid!.render({
        element: this.elRef.nativeElement,
        type: this.type,
        onLogin: this.onLogin.emit.bind(this.onLogin),
        onRegister: this.onRegister.emit.bind(this.onRegister),
        onLink: this.onLink.emit.bind(this.onLink)
      });
    }
  }

  ngOnDestroy() {
    this.ownidWidget?.destroy();
  }
}

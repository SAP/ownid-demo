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

  private ownidWidget: WidgetComponent | undefined;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    // @ts-ignore-next-line
    window.ownid!.init({
      statusInterval: 3000,
      URLPrefix: "/netcore3/ownid"
    });

    // @ts-ignore-next-line
    this.ownidWidget =  window.ownid!.render({
      element: this.elRef.nativeElement,
      type: this.type,
      onLogin: this.onLogin.emit.bind(this.onLogin),
      onRegister: this.onRegister.emit.bind(this.onRegister)
    });
  }

  ngOnDestroy() {
    this.ownidWidget?.destroy();
  }
}

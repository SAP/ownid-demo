import { ConsoleLogger } from '@services/console-logger.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ownid',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnidComponent implements OnInit, OnDestroy {
  @Input() type: string | null = null;

  @Input() data: unknown | null = null;

  @Output() onLogin = new EventEmitter();

  @Output() onRegister = new EventEmitter();

  @Output() onLink = new EventEmitter();

  @Output() onRecover = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ownidWidget: any;

  constructor(private elRef: ElementRef) {}

  async ngOnInit() {
    // @ts-ignore-next-line
    window.ownid!.init({
      statusInterval: 1000,
      URLPrefix: environment.ownidURLPrefix,
      logger: new ConsoleLogger(),
      logLevel: 'info',
    });

    if (this.type === 'link') {
      // @ts-ignore-next-line
      this.ownidWidget = await window.ownid!.gigya.renderLink(
        {
          element: this.elRef.nativeElement,
          type: this.type,
          onLink: this.onLink.emit.bind(this.onLink),
        },
        environment.gigyaApiKey,
      );
    } else {
      // @ts-ignore-next-line
      this.ownidWidget = window.ownid!.render({
        element: this.elRef.nativeElement,
        type: this.type,
        data: this.data,
        language: 'en',
        onLogin: this.onLogin.emit.bind(this.onLogin),
        onRegister: this.onRegister.emit.bind(this.onRegister),
        onLink: this.onLink.emit.bind(this.onLink),
        onRecover: this.onRecover.emit.bind(this.onRecover),
      });
    }
  }

  ngOnDestroy() {
    this.ownidWidget?.destroy();
  }
}

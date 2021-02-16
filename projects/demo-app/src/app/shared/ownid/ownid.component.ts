import { ConsoleLogger } from '@services/console-logger.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
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

  @Input() partial = false;

  @Input() toggleElement: string | null = null;

  @Input() tooltip = null;

  @Input() inline: {
    targetElement: string;
    userIdElement?: string;
    additionalElements?: string[];
    offset?: [number, number];
  } | null = null;

  @Output() onLogin = new EventEmitter();

  @Output() onRegister = new EventEmitter();

  @Output() onLink = new EventEmitter();

  @Output() onRecover = new EventEmitter();

  @Output() onError = new EventEmitter();

  @Output() ownidWidgetRef = new EventEmitter();

  @Output() onMagicLinkError = new EventEmitter();

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
      onMagicLinkLogin: this.onLogin.emit.bind(this.onLogin),
      onMagicLinkError: this.onMagicLinkError.emit.bind(this.onMagicLinkError),
    });

    const inline = this.inline
      ? {
          targetElement: document.querySelector(this.inline.targetElement),
          userIdElement: this.inline.userIdElement ? document.querySelector(this.inline.userIdElement) : null,
          additionalElements: this.inline.additionalElements?.map((selector) => document.querySelector(selector)),
          offset: this.inline.offset,
        }
      : null;

    // @ts-ignore-next-line
    // eslint-disable-next-line no-multi-assign
    const options = {
      element: this.elRef.nativeElement,
      type: this.type,
      data: this.data,
      partial: this.partial,
      tooltip: this.tooltip,
      inline,
      language: this.getURLParam('lang') || 'en',
      toggleElement: this.toggleElement ? window.document.querySelector(this.toggleElement) : null,
      onLogin: this.onLogin.emit.bind(this.onLogin),
      onRegister: this.onRegister.emit.bind(this.onRegister),
      onLink: this.onLink.emit.bind(this.onLink),
      onRecover: this.onRecover.emit.bind(this.onRecover),
      onError: this.onError.emit.bind(this.onError),
    };

    // @ts-ignore-next-line
    const component = window.ownid!.render(options);

    // @ts-ignore-next-line
    window.ownidWidget = component;
    this.ownidWidget = component;

    this.ownidWidgetRef.emit(this.ownidWidget);
  }

  ngOnDestroy() {
    this.ownidWidget?.destroy();
  }

  getURLParam(paramName: string): string | null {
    const url = window.document.location.search.replace('?', '');
    const urlParts = url.split('&');
    const paramsList = {} as { [key: string]: string };

    urlParts.forEach((urlPart) => {
      const [name, value] = urlPart.split('=');
      paramsList[name] = value;
    });

    return paramsList[paramName] ?? null;
  }
}

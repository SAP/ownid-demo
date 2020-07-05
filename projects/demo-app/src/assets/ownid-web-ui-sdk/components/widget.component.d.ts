import { BaseComponent } from './base.component';
import RequestService from '../services/request.service';
import { IPartialConfig, IWidgetConfig } from '../interfaces/i-widget.interfaces';
export default class WidgetComponent extends BaseComponent {
    protected config: IWidgetConfig;
    protected requestService: RequestService;
    protected disableDesktop: boolean;
    protected disableMobile: boolean;
    widgetReady: Promise<void>;
    private statusTimeout;
    private data;
    constructor(config: IWidgetConfig, requestService: RequestService, disableDesktop?: boolean, disableMobile?: boolean);
    protected init(config: IWidgetConfig): Promise<void>;
    protected getContext(contextUrl: string, data?: any): Promise<void>;
    private render;
    private getStatusUrl;
    private setCallStatus;
    private callStatus;
    destroy(): void;
    update(config: IPartialConfig): void;
    private attachPostMessagesHandler;
}

import { BaseComponent } from "./base.component";
import RequestService from "../services/request.service";
import { IWidgetConfig } from "../interfaces/i-widget.interfeces";
export default class WidgetComponent extends BaseComponent {
    private config;
    private requestService;
    widgetReady: Promise<void>;
    private statusTimeout;
    constructor(config: IWidgetConfig, requestService: RequestService);
    private getContext;
    private render;
    private setCallStatus;
    private callStatus;
}

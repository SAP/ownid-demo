import WidgetComponent from './widget.component';
import { IWidgetConfig } from '../interfaces/i-widget.interfaces';
import RequestService from '../services/request.service';
export default class GigyaLinkWidgetComponent extends WidgetComponent {
    protected config: IWidgetConfig;
    protected requestService: RequestService;
    constructor(config: IWidgetConfig, requestService: RequestService);
    protected init(config: IWidgetConfig): Promise<void>;
}

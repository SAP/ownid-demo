import WidgetComponent from './components/widget.component';
import { IInitConfig, IWidgetConfig } from './interfaces/i-widget.interfaces';
import GigyaLinkWidgetComponent from "./components/gigya-link-widget.component";
export default class OwnIDUiSdk {
    config: IInitConfig;
    isGigyaAdded: boolean;
    init(config?: IInitConfig): void;
    render(config: IWidgetConfig): WidgetComponent | null;
    getOwnIDPayload(widget: WidgetComponent): Promise<unknown>;
    renderLinkGigya(config: IWidgetConfig, apiKey: string): Promise<GigyaLinkWidgetComponent | null>;
}

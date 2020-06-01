import WidgetComponent from "./components/widget.component";
import { IInitConfig, IWidgetConfig } from "./interfaces/i-widget.interfeces";
export default class OwnIDUiSdk {
    config: IInitConfig;
    init(config?: IInitConfig): void;
    render(config: IWidgetConfig): WidgetComponent | null;
}

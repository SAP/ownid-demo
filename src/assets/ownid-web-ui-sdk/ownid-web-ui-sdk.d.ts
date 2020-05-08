import WidgetComponent from "./components/widget.component";
import { IWidgetConfig } from "./interfaces/i-widget.interfeces";
export default class OwnIDUiSdk {
    init(config: IWidgetConfig): WidgetComponent | null;
}

import { ICommonComponent } from './common/base-common.component';
import { IWidgetConfig } from '../interfaces/i-widget.interfaces';
export declare abstract class BaseComponent {
    protected constructor(config: IWidgetConfig);
    private readonly parent;
    protected elements: Array<ICommonComponent>;
    protected context: string | null;
    protected nonce: string | null;
    protected addChild(child: ICommonComponent): void;
    protected isMobile(): boolean;
}

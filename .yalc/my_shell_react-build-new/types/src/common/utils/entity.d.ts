import { ListItem, ServerListItem } from '../constants/interfaces/entity';
import { WidgetInfo } from '../constants/interfaces/workshop';
export declare function serverListItemParser(item: ServerListItem): ListItem;
export declare function widgetListParser(widget: WidgetInfo): ListItem;

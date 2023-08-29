import {BaseListItem, ListItemText} from "./ListItem";
import {Theme} from "./Theme";
import {RADIO_OFF_24, RADIO_ON_24} from "./Icons";

export function RadioListItem(text, checked, onClick) {
    return BaseListItem([
        View({
            style: {
                backgroundColor: checked ? Theme.accentColor : Theme.textColor,
                maskImage: checked ? RADIO_ON_24 : RADIO_OFF_24,
                WebkitMaskImage: checked ? RADIO_ON_24 : RADIO_OFF_24,
                width: 24,
                height: 24,
                margin: 8,
            }
        }, []),
        ListItemText(text, ""),
    ], onClick);
}
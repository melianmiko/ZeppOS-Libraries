import {InvisibleButton} from "./Buttons";
import {Theme} from "./Theme";

export function BaseListItem(children, onClick) {
    return View({
        style: {
            position: "relative",
            borderBottom: `thin ${Theme.borderColor} solid`,
        }
    }, [
        View({
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }
        }, children),
        InvisibleButton(onClick)
    ])
}

export function ListItemText(title, description) {
    return View({
        style: {
            flex: "1",
            margin: "8px",
            width: "0",
        }
    }, [
        Text({
            style: {
                marginBottom: description ? "0.1em" : "0",
                display: "block",
            }
        }, title),
        Text({
            style: {
                fontSize: "0.9em",
                opacity: "0.5",
                display: "block",
            }
        }, description),
    ])
}
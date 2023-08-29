import {InvisibleButton} from "./Buttons";
import {Theme} from "./Theme";

export function TabOffset() {
    return View({
        style: {
            minHeight: "72px"
        }
    }, []);
}

export function TabButton(config) {
    const {text, icon, active, callback} = config;
    const color = active ? Theme.accentColor : Theme.textColor;

    return View({
        style: {
            position: "relative",
            flex: 1,
            height: "64px"
        }
    }, [
        InvisibleButton(callback),
        View({
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }
        }, [
            View({
                style: {
                    width: "32px",
                    height: "32px",
                    backgroundColor: color,
                    WebkitMaskImage: icon,
                    maskImage: icon,
                    margin: "4px auto",
                }
            }),
            Text({
                style: {
                    textAlign: "center",
                    color,
                    display: "block",
                    fontSize: ".85rem",
                }
            }, text)
        ])
    ])
}
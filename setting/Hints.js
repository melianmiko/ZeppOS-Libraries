import {Theme} from "./Theme";

export function FloatingActionButtonHint(text, offset = 0) {
    // return Text({}, text);
    return View({
        style: {
            position: "fixed",
            bottom: offset + 32 + 4 + 56,
            right: 24,
            zIndex: 2,
            backgroundColor: Theme.accentLightColor,
            maxWidth: "80vw",
            textAlign: "right",
            color: Theme.accentColor,
            borderRadius: 12,
            padding: "8px 16px",
        }
    }, [
        Text({}, text),
        View({
            style: {
                position: "fixed",
                bottom: offset + 32 + 56,
                right: 48,
                width: 12,
                height: 12,
                transform: "rotate(45deg)",
                backgroundColor: Theme.accentLightColor,
            }
        }, [])
    ])
}
import {gettext as t} from "i18n";
import {Theme} from "./Theme";

export function BottomSheet(open, onClose, children) {
    if(!open) return null;

    return View({
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: Theme.backdropColor,
            zIndex: 80,
            overflow: "auto"
        }
    }, [
        Button({
            style: {
                margin: 0,
                padding: 0,
                display: "block",
                height: "25vh",
                width: "100%",
                background: "none",
                boxShadow: "none",
                color: "rgba(255,255,255,0.3)",
            },
            label: t("Click here to close popup"),
            onClick: onClose,
        }),
        View({
            style: {
                background: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
                paddingTop: "24px",
                boxSizing: "border-box",
                minHeight: "75vh",
            }
        }, [
            ...children
        ])
    ])
}
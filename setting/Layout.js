import {Theme} from "./Theme";

export function TextRoot(children) {
    return View({
        style: {
            margin: "0 8px",
        }
    }, children);
}

export function CenteredPane(children) {
    return View({
        style: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }
    }, children)
}

export function SettingsBody(children) {
    return View({
        style: {
            backgroundColor: Theme.backgroundColor,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            overflowY: "auto",
            overflowX: "auto",
        }
    }, children)
}

export function BottomToolbar(children) {
    return View({
        style: {
            backgroundColor: Theme.backgroundColor,
            boxShadow: Theme.simpleShadow,
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            zIndex: 70,
        }
    }, children)
}
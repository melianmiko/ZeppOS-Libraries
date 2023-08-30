import {Theme} from "./Theme";

export function InvisibleButton(onClick) {
    return Button({
        onClick,
        style: {
            margin: 0,
            padding: 0,
            boxShadow: "none",
            borderRadius: 0,
            background: "transparent",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0
        }
    })
}

export function PrimaryButton(text, onClick) {
    return Button({
        onClick,
        label: text,
        style: {
            boxShadow: "none",
            color: "#FFFFFF",
            background: Theme.accentColor,
        }
    })
}

export function FloatingActionButton(icon, onClick, offset=0) {
    return View({
        style: {
            position: "fixed",
            bottom: 24 + offset,
            right: 24,
            zIndex: 40,
        }
    }, [
        View({
            style: {
                position: "relative",
                width: "56px",
                height: "56px",
            }
        }, [
            Button({
                style: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    minWidth: 0,
                    borderRadius: "50%",
                    padding: 0,
                    margin: 0,
                    top: 0,
                    left: 0,
                    background: Theme.accentColor,
                    zIndex: 8,
                }
            }),
            View({
                style: {
                    WebkitMaskImage: icon,
                    maskImage: icon,
                    background: "#FFFFFF",
                    position: "absolute",
                    top: 12,
                    left: 12,
                    width: 32,
                    height: 32,
                    zIndex: 9,
                }
            }),
            Button({
                onClick,
                style: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    minWidth: 0,
                    borderRadius: "50%",
                    padding: 0,
                    margin: 0,
                    top: 0,
                    left: 0,
                    background: "transparent",
                    boxShadow: "none",
                    zIndex: 10,
                }
            }),
        ])
    ]);
}

export function OptionButtonWithIcon(text, icon, onClick) {
    return View({
        style: {
            position: "relative",
            display: "inline-flex",
            padding: "8px",
            alignItems: "center",
            marginBottom: "8px",
        }
    }, [
        InvisibleButton(onClick),
        View({
            style: {
                backgroundImage: icon,
                width: "16px",
                height: "16px",
                marginRight: "8px"
            }
        }),
        Text({
            style: {
                textTransform: "uppercase"
            }
        }, text)
    ])
}
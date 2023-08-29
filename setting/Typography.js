import {Theme} from "./Theme";

export function Title(text) {
    return Text({
        style: {
            display: "block",
            fontSize: "1.5rem",
            marginTop: "0.6rem",
            marginBottom: "0.5rem"
        }
    }, text);
}

export function Link(text) {
    return Text({
        style: {
            userSelect: "text",
            color: Theme.accentColor,
        }
    }, text);
}

export function Paragraph(text) {
    if(typeof text !== "string")
        return View({
            style: {
                display: "block",
                marginBottom: "0.5rem"
            }
        }, text.map((item) => typeof item == "string" ? Text({}, item) : item))

    return Text({
        style: {
            display: "block",
            marginBottom: "0.5rem"
        }
    }, text)
}
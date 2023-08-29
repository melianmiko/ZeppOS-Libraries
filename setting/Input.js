export function Input(label, value, onChange) {
    return TextInput({
        label,
        onChange,
        value,
        subStyle: {
            border: "thin rgba(0,0,0,0.1) solid",
            borderRadius: "8px",
            margin: "-1em 8px 12px 8px",
            padding: "8px",
            paddingTop: "1.2em",
            height: "1.5em",
            boxSizing: "content-box",
            lineHeight: "1.5em",
            color: "#000"
        },
        labelStyle: {
            position: "relative",
            top: "0.2em",
            color: "#555",
            paddingLeft: "16px",
            fontSize: "0.8em"
        }
    })
}
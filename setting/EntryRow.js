export function EntryRow(data) {
    return Button({
        ...data,
        style: {
            display: "block",
            fontSize: "1.1em",
            padding: "8px",
            borderBottom: "thin #efefef solid",
            boxShadow: "none",
            background: "none",
            textAlign: "left",
            width: "100%",
            margin: "0"
        }
    })
}
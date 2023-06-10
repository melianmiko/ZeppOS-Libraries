import {ListScreen} from "./ListScreen";
import {Path} from "./Path";
import {SCREEN_WIDTH} from "./UiParams";

export class ResolveFromAssets {
    constructor(textFilesRoot, pagesRoot="page/", assetsRoot="") {
        this.path = new Path("assets", textFilesRoot);
        this.pageRoot = pagesRoot;
        this.assetsRoot = assetsRoot
    }

    getText(path) {
        return this.path.get(path).fetchText();
    }

    assetPath(path) {
        return this.assetsRoot + path;
    }

    pagePath(path) {
        return this.pageRoot + path;
    }
}

export class MarkdownRenderScreen extends ListScreen {
    constructor(resolver, url, selfPage="MarkdownReader") {
        super();
        this.resolver = resolver;
        this.url = url;
        this.selfPage = selfPage;
    }

    start() {
        const lines = this.resolver.getText(this.url).replaceAll("\r", "").split("\n");

        for(const line of lines) {
            if(line === "") continue;

            switch (line[0]) {
                case "[":
                    this.mdLink(line);
                    break;
                case "!":
                    this.mdImage(line);
                    break;
                case "#":
                    this.mdHeadline(line);
                    break;
                default:
                    this.text({text: line});
            }
        }

        this.offset();
    }

    mdLink(line) {
        const label = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
        const url = line.substring(line.indexOf("(") + 1, line.indexOf(")"));
        this.row({
            text: label,
            icon: "icon_s/link.png",
            callback: () => {
                if(url.startsWith("page://")) {
                    hmApp.gotoPage({
                        url: this.resolver.pagePath(url.substring(7))
                    })
                } else {
                    hmApp.gotoPage({
                        url: this.resolver.pagePath(this.selfPage),
                        param: url
                    })
                }
            }
        })
    }

    mdImage(line) {
        const props = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
        const url = line.substring(line.indexOf("(") + 1, line.indexOf(")"));
        const [width, height] = props.split("x");
        const offsetX = Math.floor((SCREEN_WIDTH - parseInt(width)) / 2);

        hmUI.createWidget(hmUI.widget.IMG, {
            x: offsetX,
            y: this.positionY,
            src: this.resolver.assetPath(url)
        })

        this.positionY += parseInt(height) + 8;
    }

    mdHeadline(line) {
        this.headline(line.substring(line.indexOf(" ")))
    }
}
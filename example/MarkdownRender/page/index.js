import {MarkdownRenderScreen, ResolveFromAssets} from "../../../MarkdownRender";

Page({
  build() {
    const resolver = new ResolveFromAssets("");
    const screen = new MarkdownRenderScreen(resolver, "demo.md");
    screen.start();
  }
})

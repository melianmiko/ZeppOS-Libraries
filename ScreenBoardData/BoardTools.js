import DeviceParams from "./DeviceParams";
import { RenderPluginT9 } from "./RenderPluginT9";
import { RenderPluginT14 } from "./RenderPluginT14";
import { RenderPluginQWERTY } from "./RenderPluginQWERTY";

const DeviceInfo = hmSetting.getDeviceInfo();

export class BoardTools {
  constructor(board, config) {
    this.board = board;
    this.config = config;
    this.renderer = this._findRenderer();
    this.fallbackLayouts = this._getFallbackLayouts();
  }

  getRowPosition(i) {
    const roundDelta = 0.04;
    return [
      DeviceParams.circle ? i * roundDelta * DeviceInfo.width : 0,
      DeviceParams.screenHeight + DeviceParams.titleHeight + i * DeviceParams.rowHeight,
      DeviceInfo.width * (1 - (DeviceParams.circle ? i * roundDelta * 2 : 0))
    ];
  }

  getCapsIcon() {
    switch(this.board.capsState) {
      case "abc":
        return "screen_board/caps_off.png";
      case "Abc":
        return "screen_board/caps_mid.png";
      case "ABC":
        return "screen_board/caps_on.png";
    }
  }

  _findRenderer() {
    let layout = this.config.get("layout", DeviceParams.layouts[0]);
    if(this.board && this.board.forceRenderer) layout = this.board.forceRenderer;
    
    switch(layout) {
      case "t9":
        return new RenderPluginT9(this.board);
      case "t14":
        return new RenderPluginT14(this.board);
      case "qwerty":
        return new RenderPluginQWERTY(this.board);
    }
  }

  _getFallbackLayouts() {
    const layouts = [];
    const userLang = DeviceRuntimeCore.HmUtils.getLanguage().substring(0, 2);
    if(this.renderer.layoutData[userLang] && userLang != "en")
      layouts.push(userLang)
    layouts.push("en")
    return layouts;
  }
}
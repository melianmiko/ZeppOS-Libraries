import DeviceParams from "./DeviceParams";
import { LAYOUTS_T9 } from "./LAYOUTS_T9";
import { BaseButtonsManager } from "./BaseButtonsManager";

const DeviceInfo = hmSetting.getDeviceInfo();

export class RenderPluginT9 {
  constructor(board) {
    this.board = board;
    this.hasBackspace = false;
    this.layoutData = LAYOUTS_T9;
    this.extraLayouts = ["numbers"];

    this.inputButtons = [];
    this.manager = new BaseButtonsManager(board, this.inputButtons, LAYOUTS_T9);
  }

  build() {
    // 1-9 btns
    for(let i = 0; i < 3; i++) {
      const [x, y, w] = this.board.tools.getRowPosition(i);
      const buttonWidth = Math.floor(w / 3);
      for(let j = 0; j < 3; j++) {
        const btn = this.board.createTextButton(x + j * buttonWidth, 
          y, 
          buttonWidth, 
          i * 3 + j, 
          this.manager.onButtonPress);
        this.inputButtons.push(btn);
      }
    }

    // Last row
    const [x, y, w] = this.board.tools.getRowPosition(3);
    const buttonWidth = Math.floor(w / 3);
    this.capsButton = this.board.createIconButton(x, y, buttonWidth, "", 
      0, this.board.toggleCaps);
    this.layoutButton = this.board.createIconButton(x + buttonWidth * 2, y, buttonWidth, "screen_board/lang.png",
      0, this.board.switchLayout);

    const lastButtonn = this.board.createTextButton(x + buttonWidth, y, buttonWidth, 
      9, this.manager.onButtonPress);
    this.inputButtons.push(lastButtonn);
  }

  useLayout(name) {
    this.capsButton.setProperty(hmUI.prop.SRC, this.board.tools.getCapsIcon());
    return this.manager.useLayout(name);
  }
}

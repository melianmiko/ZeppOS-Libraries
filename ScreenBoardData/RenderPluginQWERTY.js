import { LAYOUTS_QWERTY, QWERTY_SYMBOLS } from "./LAYOUTS_QWERTY";
import { BaseButtonsManager } from "./BaseButtonsManager";

export class RenderPluginQWERTY {
  constructor(board) {
    this.board = board;
    this.hasBackspace = true;
    this.hasLanguageIndicator = true;
    this.layoutData = LAYOUTS_QWERTY;
    this.symbolsData = QWERTY_SYMBOLS;
    this.extraLayouts = [];

    this.inputButtons = [];
    this.buttonCounts = [10, 9, 7];
    this.manager = new BaseButtonsManager(this.board, this.inputButtons, this.layoutData);

    this.symbToggle = this.symbToggle.bind(this);
    this.addSpace = this.addSpace.bind(this);
  }

  build() {
    // First rows
    for(let i = 0; i < 3; i++) {
      let count = this.buttonCounts[i];
      let [x,y,w] = this.board.tools.getRowPosition(i);
      if(i === 2) {
        x += 48;
        w -= 96;
      }

      let buttonWidth = Math.round(w / count);
      for(let i = 0; i < count; i++) {
        const btn = this.board.createTextButton(x + i * buttonWidth,
          y, buttonWidth, this.inputButtons.length, this.manager.onButtonPress);
        this.inputButtons.push(btn);
      }  
    }

    this.buildExtras();
    this.buildSpaceRow();
  }

  buildExtras() {
    const [x, y, w] = this.board.tools.getRowPosition(2);

    this.capsButton = this.board.createIconButton(x, y, 48, "screen_board/caps_off.png", 
      0, this.board.toggleCaps);
    this.backspaceView = this.board.createIconButton(x + w - 48, y, 48, "screen_board/backspace.png",
      0, this.board.doBackspace);
  }

  buildSpaceRow() {
    const [x, y, w] = this.board.tools.getRowPosition(3);
    
    this.symbolsBtn = this.board.createTextButton(x, y, 64, 0, this.symbToggle, true);
    this.symbolsBtn.setProperty(hmUI.prop.TEXT, "1!?");

    this.langBtn = this.board.createIconButton(x + 64, y, 64, "screen_board/lang.png", 
      0, this.board.switchLayout);
    this.spaceBtn = this.board.createSpaceButton(x + 128, y, w - 192, this.addSpace);

    this.inputButtons.push(this.board.createTextButton(x + w - 64, y, 64, 
      this.inputButtons.length, this.manager.onButtonPress, true))
  }

  symbToggle() {
    if(this.manager.isSubscreen) 
      return this.manager.useLayout(this.manager.layout);
    this.manager.useSubscreen(this.symbolsData, 0, true);
  }

  addSpace() {
    if(this.manager.isSubscreen) 
      this.manager.useLayout(this.manager.layout);
    this.board.value += " ";
  }

  useLayout(name) {
    this.capsButton.setProperty(hmUI.prop.SRC, this.board.tools.getCapsIcon());
    this.spaceBtn.setProperty(hmUI.prop.TEXT, name.toUpperCase());
    return this.manager.useLayout(name);
  }
}
export class BaseButtonsManager {
  constructor(board, inputButtons, layoutData) {
    this.board = board;
    this.inputButtons = inputButtons;

    this.isSubscreen = false;
    this.subscreenData = [];
    this.noAutoExit = false;

    this.layout = "";
    this.layoutData = layoutData;

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  useLayout(name) {
    const data = this.layoutData[name];
    const isCapsUp = this.board.capsState !== "abc";

    this.layout = name;
    this.isSubscreen = false;

    for(let i = 0; i < this.inputButtons.length; i++) {
      let text = data[i]
      if(Array.isArray(text)) text = text.join("").substring(0, 3);
      if(typeof text == "object") text = Object.keys(text)[0];
      if(isCapsUp) text = text.toUpperCase();
      this.inputButtons[i].setProperty(hmUI.prop.TEXT, text.replace(" ", "_"));
    }
  }

  useSubscreen(data, i, noAutoExit=false) {
    const isCapsUp = this.board.capsState !== "abc";

    if(!Array.isArray(data))
      data = data[Object.keys(data)[0]];

    this.subscreenData = data;
    this.isSubscreen = true;
    this.noAutoExit = noAutoExit;

    for(let i = 0; i < this.inputButtons.length; i++) {
      let text = i < data.length ? data[i] : "";
      if(typeof text == "object") text = text.join("").substring(0, 3);
      if(isCapsUp) text = text.toUpperCase();
      this.inputButtons[i].setProperty(hmUI.prop.TEXT, text.replace(" ", "_"));
    }
  }

  onButtonPress(ident) {
    if(this.isSubscreen) {
      let data = ident < this.subscreenData.length ? this.subscreenData[ident] : "";
      if(typeof data == "object") return this.useSubscreen(data, ident);
      if(this.board.capsState !== "abc") data = data.toUpperCase();

      this.board.value += data;
      if(!this.noAutoExit) this.useLayout(this.layout);
      return;
    }

    let data = this.layoutData[this.layout][ident];
    if(typeof data == "object") {
      // Run subscreen
      this.useSubscreen(data, ident);
    } else {
      if(this.board.capsState !== "abc") data = data.toUpperCase();
      this.board.value += data;
    }
  }
}

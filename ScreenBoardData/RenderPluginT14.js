import { RenderPluginQWERTY } from "./RenderPluginQWERTY";
import { LAYOUTS_T14, T14_SYMBOLS } from "./LAYOUTS_T14";
import { BaseButtonsManager } from "./BaseButtonsManager";

export class RenderPluginT14 extends RenderPluginQWERTY {
  constructor(board) {
    super(board);
    this.buttonCounts = [5,5,4];
    this.layoutData = LAYOUTS_T14;
    this.symbolsData = T14_SYMBOLS;

    this.manager = new BaseButtonsManager(this.board, this.inputButtons, this.layoutData);
  }
}
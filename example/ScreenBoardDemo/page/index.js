import { ScreenBoard } from "../../../ScreenBoard";
import { ScreenBoardSetup } from "../../../ScreenBoardSetup";

Page({
  onInit() {
    const board = new ScreenBoard();
    board.title = "ScreenBaord Demo";
    board.confirmButtonText = "Settings";
    board.onConfirm = (t) => {
      console.log(t);
      board.visible = false;
      new ScreenBoardSetup().start();
    }
  }
});

import {IS_LOW_RAM_DEVICE, SCREEN_HEIGHT, SCREEN_WIDTH} from "./UiParams";

export function goBack() {
  if(!IS_LOW_RAM_DEVICE) return hmApp.goBack();
  
  hmApp.setLayerY(0);
  hmUI.createWidget(hmUI.widget.FILL_RECT, {
    x: 0,
    y: 0,
    w: SCREEN_WIDTH,
    h: SCREEN_HEIGHT,
    color: 0x0
  });
  timer.createTimer(350, 0, () => hmApp.goBack());
}

export function goBackGestureCallback(ev) {
  if(ev === hmApp.gesture.RIGHT) {
  	goBack();
    return true;
  }

  return false;
}

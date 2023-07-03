import { ListScreen } from "../ListScreen";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../UiParams";

export class RemManPage extends ListScreen {
  constructor(messageBuilder, userURL="https://zepp.mmk.pw/zf") {
    super()
    this.messageBuilder = messageBuilder;
    this.userURL = userURL;
  }

  onConnect() {
    this.messageBuilder.request({
      remManSetState: "ready"
    }).then((resp) => {
      this.buildConnectionUI(resp.code);
    })
  }

  start() {
    hmUI.updateStatusBarTitle("RemoteMan")
    hmSetting.setBrightScreen(3600);

    this.loading = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0, 
      w: SCREEN_WIDTH,
      h: SCREEN_HEIGHT,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_size: 26,
      color: 0xFFFFFF,
      text: "Connecting..."
    })
  }

  buildConnectionUI(code) {
    hmUI.deleteWidget(this.loading);

    hmApp.registerGestureEvent((e) => this.handleGesture(e));
    hmApp.registerKeyEvent((a, b) => this.handleKey(a, b));
    timer.createTimer(0, 5000, () => {
      this.messageBuilder.request({
        remManPing: true
      });
    });

    this.text({ text: `Go to website`, color: 0x999999 });
    this.text({ text: this.userURL, fontSize: this.fontSize + 2 });
    this.text({ text: "and enter this code to access your files:", color: 0x999999 })
    this.text({ text: String(code), fontSize: this.fontSize + 12 });

    this.headline("Notices");
    this.text({text: "Do not turn off device screen until using remote manager."});
    this.text({text: "Recomend to keep phone screen on too, for faster data transfering."})
    this.offset();
  }

  tryToClose() {
    hmApp.unregisterGestureEvent();

    hmUI.showToast({text: "Closing..."});
    this.messageBuilder.request({
      remManSetState: "closed"
    }).then(() => {
      hmApp.goBack();
    });
  }

  handleGesture(event) {
    if(event == hmApp.gesture.RIGHT) {
      this.tryToClose();
      return true;
    }
    return false;
  }

  handleKey(key, action) {
    if(action == hmApp.action.CLICK) {
      this.tryToClose();
      return true;
    }
    return false;
  }
}

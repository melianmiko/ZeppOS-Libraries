import { SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_MARGIN_X, SCREEN_MARGIN_Y } from "../UiParams";

export class RemManPage {
  constructor(messageBuilder, handler, userURL="zepp.mmk.pw/zf", t=null) {
    this.messageBuilder = messageBuilder;
    this.userURL = userURL;
    this.handler = handler;
    this.widgets = [];
    this.userBrightness = null;

    if(t) this.gettext = t;

    if(handler) {
      handler.onError = (e) => this.log.setText(String(e));
      handler.onPackageLog = () => this.onPackageLog();
    }
  }

  gettext(v) {
    return v;
  }

  onConnect() {
    this.messageBuilder.request({
      package: "remman",
      action: "init"
    }).then((resp) => {
      this.startConnectingUi(resp.code, resp.uuid);
      this.onError("No errors");
    })
  }

  onPackageLog() {
    if(!this._conUI) {
      this.startStatus();
      this._conUI = true;
    }
  }

  clear() {
    while(this.widgets.length > 0) {
      hmUI.deleteWidget(this.widgets.pop());
    }
  }

  exit() {
    hmApp.setScreenKeep(false);
    if(this.userBrightness) {
      hmSetting.setScreenAutoBright(this.userBrightness[0]);
      hmSetting.setBrightness(this.userBrightness[1]);
    }
  }

  start() {
    hmUI.updateStatusBarTitle("");
    hmApp.setScreenKeep(true);
    hmSetting.setBrightScreen(3600);

    // Start loading screen
    this.clear();
    this.widgets.push(hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0, 
      w: SCREEN_WIDTH,
      h: SCREEN_HEIGHT,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_size: 26,
      color: 0xFFFFFF,
      text: this.gettext("Connecting..."),
    }));
  }

  startConnectingUi(code, uuid) {
    this.clear();
    this.widgets.push(hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: SCREEN_MARGIN_Y,
      w: SCREEN_WIDTH,
      align_h: hmUI.align.CENTER_H,
      h: 24,
      color: 0x999999,
      text_size: 20,
      text: this.gettext("Go to website"),
    }));
    this.widgets.push(hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: SCREEN_MARGIN_Y + 24,
      w: SCREEN_WIDTH,
      align_h: hmUI.align.CENTER_H,
      color: 0xFFFFFF,
      h: 28,
      text_size: 20,
      text: this.userURL,
    }));
    this.widgets.push(hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: SCREEN_MARGIN_Y + 52,
      w: SCREEN_WIDTH,
      align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP,
      h: 64,
      color: 0x999999,
      text_size: 20,
      text: this.gettext("and enter this code to access your files:"),
    }));
    this.widgets.push(hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: SCREEN_MARGIN_Y + 116,
      w: SCREEN_WIDTH,
      h: 42,
      align_h: hmUI.align.CENTER_H,
      color: 0xFFFFFF,
      text_size: 32,
      text: String(code)
    }))

    this.headline("Error log:");
    this.log = this.text({
      text: "..."
    });
  }

  startStatus() {
    this.userBrightness = [
      hmSetting.getScreenAutoBright(),
      hmSetting.getBrightness()
    ];
    hmSetting.setScreenAutoBright(false);
    hmSetting.setBrightness(2);

    this.clear();
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: SCREEN_MARGIN_Y,
      w: SCREEN_WIDTH,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      h: 200,
      color: 0xFFFFFF,
      text_size: 20,
      text: this.gettext("Connected, don't dim screen and leave application until using remote manager."),
    });
    this.log = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: SCREEN_MARGIN_Y + 200,
      w: SCREEN_WIDTH,
      align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP,
      h: 72,
      color: 0xFF2222,
      text_size: 20,
      text: "",
    })
  }
}

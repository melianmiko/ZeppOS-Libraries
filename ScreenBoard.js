import DeviceParams from "./ScreenBoardData/DeviceParams";
import { BoardTools } from "./ScreenBoardData/BoardTools";
import { ConfigStorage } from "./ConfigStorage";
import { Path } from "./Path";

const DeviceInfo = hmSetting.getDeviceInfo();
const CAPS_OPTIONS = ["abc", "Abc", "ABC"];

export class ScreenBoard {
  constructor(forceLayouts=null, forceRenderer=null) {
    this.config = new ConfigStorage(new Path("data", "screenboard.json"));
    this.config.load();

    this.forceLayouts = forceLayouts;
    this.forceRenderer = forceRenderer;

    this.tools = new BoardTools(this, this.config);
    this.renderer = this.tools.renderer;
    this._displayValue = "";
    this.capsState = "abc";

    this._layouts = this.getLayouts();
    this._layout = this._layouts[0];

    this.switchLayout = this.switchLayout.bind(this);
    this.toggleCaps = this.toggleCaps.bind(this);
    this.doBackspace = this.doBackspace.bind(this);

    this.build();
  }

  getLayouts() {
    if(this.forceLayouts) return this.forceLayouts;
    let layouts = this.config.get("layouts", this.tools.fallbackLayouts);
    return [
      ...layouts,
      ...this.renderer.extraLayouts
    ]
  }

  build() {
    this.group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 0,
      y: 0,
      w: DeviceInfo.width,
      h: DeviceInfo.height
    });
    this.group.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: DeviceInfo.width,
      h: DeviceInfo.height,
      color: 0x0
    })
    this.titleView = this.group.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0,
      w: DeviceInfo.width,
      h: DeviceParams.titleHeight,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      text_size: DeviceParams.fontSize,
      text: "Input",
      color: 0xAAAAAA,
    });

    let valueX, valueW;
    if(DeviceParams.circle) {
      valueX = 64;
      valueW = DeviceInfo.width - valueX * 2;
    } else if(!this.renderer.hasBackspace) {
      valueX = 0;
      valueW = DeviceInfo.width - 36;
    } else {
      valueX = 0;
      valueW = DeviceInfo.width;
    }

    this.valueScreen = this.group.createWidget(hmUI.widget.TEXT, {
      x: valueX,
      y: DeviceParams.titleHeight,
      w: valueW,
      h: DeviceParams.screenHeight,
      align_v: hmUI.align.CENTER_V,
      text: "",
      text_size: DeviceParams.fontSize,
      color: 0xFFFFFF,
      text_style: hmUI.text_style.WRAP,
    });

    if(!this.renderer.hasBackspace) {
      this.backspaceView = this.group.createWidget(hmUI.widget.IMG, {
        x: valueX + valueW,
        y: DeviceParams.titleHeight + DeviceParams.screenHeight - 48,
        w: 36,
        h: 48,
        pos_x: 12,
        pos_y: 12,
        src: "screen_board/backspace.png",
      })
      this.backspaceView.addEventListener(hmUI.event.CLICK_UP, this.doBackspace)
    }

    const y = this.tools.getRowPosition(4)[1]
    this.confirmButton = this.group.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y,
      w: DeviceInfo.width,
      h: DeviceInfo.height - y,
      text: "Confirm",
      text_size: DeviceParams.fontSize,
      color: 0xFFFFFF,
      normal_color: 0x111111,
      press_color: 0x222222,
      click_func: () => this.onConfirm(this.value)
    });

    this.renderer.build();
    this.renderer.useLayout(this._layout);
  }

  switchLayout() {
    const indexNext = (this._layouts.indexOf(this._layout) + 1) % this._layouts.length;
    this._layout = this._layouts[indexNext];

    this.renderer.useLayout(this._layout);
  }

  toggleCaps() {
    let newState = (CAPS_OPTIONS.indexOf(this.capsState) + 1) % 3;
    this.capsState = CAPS_OPTIONS[newState];
    this.renderer.useLayout(this._layout);
  }

  doBackspace() {
    const v = this.value;
    this.value = v.substring(0, v.length - 1);
  }

  createTextButton(x, y, w, ident, handler, special=false) {
    return this.group.createWidget(hmUI.widget.BUTTON, {
      x: x + 2,
      y: y + 2,
      w: w - 4,
      h: DeviceParams.rowHeight - 4,
      text: "",
      text_size: DeviceParams.buttonFontSize,
      normal_color: special ? 0x191919 : 0x111111,
      press_color: 0x222222,
      radius: 4,
      color: 0xCCCCCC,
      click_func: () => handler(ident)
    })
  }

  createSpaceButton(x, y, w, handler) {
    return this.group.createWidget(hmUI.widget.BUTTON, {
      x: x + 2,
      y: y + 2,
      w: w - 4,
      h: DeviceParams.rowHeight - 4,
      text: "",
      text_size: DeviceParams.buttonFontSize - 8,
      normal_color: 0x191919,
      press_color: 0x222222,
      radius: 4,
      color: 0x777777,
      click_func: () => handler()
    })
  }

  createIconButton(x, y, w, icon, ident, handler) {
    this.group.createWidget(hmUI.widget.FILL_RECT, {
      x: x + 2,
      y: y + 2,
      w: w - 4,
      h: DeviceParams.rowHeight - 4,
      radius: 4,
      color: 0x191919
    });

    const view = this.group.createWidget(hmUI.widget.IMG, {
      x,
      y,
      w,
      h: DeviceParams.rowHeight,
      pos_x: Math.floor((w - 24) / 2),
      pos_y: Math.floor((DeviceParams.rowHeight - 24) / 2),
      src: icon
    });
    view.addEventListener(hmUI.event.CLICK_UP, () => {
      handler(ident);
    });

    return view;
  }

  onConfirm(text) {
    // Override me
    console.log(text);
  }

  displayFormat(text) {
    // Override me
    return text;
  }

 get visible() {
    return this.group.getProperty(hmUI.prop.VISIBLE);
  }

  set visible(v) {
    this.group.setProperty(hmUI.prop.VISIBLE, v);
    hmApp.setLayerY(0);
  }

  set confirmButtonText(v) {
    this.confirmButton.setProperty(hmUI.prop.TEXT, v);
  }

  set title(v) {
    this.titleView.setProperty(hmUI.prop.TEXT, v);
  }

  get value() {
    return this._displayValue;
  }

  set value(v) {
    this.valueScreen.setProperty(hmUI.prop.TEXT, this.displayFormat(v));
    this._displayValue = v;

    if(this.capsState == "Abc") {
      this.capsState = "abc";
      this.renderer.useLayout(this._layout);
    }
  }
}

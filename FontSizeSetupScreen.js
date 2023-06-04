import { ListScreen } from "./ListScreen";
import { WIDGET_WIDTH, SCREEN_MARGIN_X, SCREEN_MARGIN_Y, SCREEN_HEIGHT } from "./UiParams";

export class FontSizeSetupScreen extends ListScreen {
  start() {
    this.fontSize = this.getSavedFontSize(this.fontSize);
    const margin = Math.min(64, SCREEN_MARGIN_Y);
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: SCREEN_MARGIN_X,
      y: margin,
      w: WIDGET_WIDTH,
      h: 64,
      text: "-",
      text_size: 48,
      radius: 32,
      normal_color: 0x111111,
      press_color: 0x222222,
      click_func: () => {
        this.fontSize -= 1;
        this.reload();
        this.onChange(this.fontSize);
      }
    });

    this.preview = hmUI.createWidget(hmUI.widget.TEXT, {
      x: SCREEN_MARGIN_X,
      y: margin + 72,
      w: WIDGET_WIDTH,
      h: SCREEN_HEIGHT - 144 - margin * 2,
      text_size: this.fontSize,
      text_style: hmUI.text_style.WRAP,
      align_v: hmUI.align.CENTER_V,
      color: 0xFFFFFF,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia metus ornare lacus gravida vestibulum."
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: SCREEN_MARGIN_X,
      y: SCREEN_HEIGHT - margin - 64,
      w: WIDGET_WIDTH,
      text_size: 48,
      h: 64,
      text: "+",
      radius: 32,
      normal_color: 0x111111,
      press_color: 0x222222,
      click_func: () => {
        this.fontSize += 1;
        this.reload();
        this.onChange(this.fontSize);
      }
    });
  }

  reload() {
    this.preview.setProperty(hmUI.prop.TEXT_SIZE, this.fontSize);
  }

  getSavedFontSize(fallback) {
    return fallback;
  }

  onChange(val) {
    // Override
  }
}

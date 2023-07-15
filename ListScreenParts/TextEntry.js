import {SCREEN_MARGIN_X, WIDGET_WIDTH} from "../UiParams";

export class TextEntry {
    constructor(userConfig, screen, positionY) {
        this.screen = screen;
        this.positionY = positionY;
        this.config = {
			color: 0xFFFFFF,
			fontSize: this.screen.fontSize,
            align: hmUI.align.LEFT,
            topOffset: 0,
            bottomOffset: 0,
            card: {},
			...userConfig
        }
    }

    _init() {
        this.widget = hmUI.createWidget(hmUI.widget.TEXT, this._widgetConfig);
    }

    _postInit() {

    }

    _setPositionY(y) {
        this.positionY = y;
        this.widget.setProperty(hmUI.prop.MORE, this._widgetConfig);
    }

    setText(text) {
        this.config.text = text;
        this.widget.setProperty(hmUI.prop.MORE, this._widgetConfig);
        this.screen.onHeightChange(this);
    }

    get _widgetConfig() {
		const textWidth = WIDGET_WIDTH - 8;
        return {
			x: SCREEN_MARGIN_X + 4,
			y: this.positionY + this.config.topOffset,
			w: textWidth,
			h: this.viewHeight,
			align_v: hmUI.align.CENTER_V,
            align_h: this.config.align,
			text_style: hmUI.text_style.WRAP,
			text_size: this.config.fontSize,
			color: this.config.color,
			text: this.config.text
		};
    }

    get viewHeight() {
		const textWidth = WIDGET_WIDTH - 8;
		const { height } = hmUI.getTextLayout(this.config.text, {
			text_size: this.config.fontSize,
			text_width: textWidth
		});
        return height + this.config.bottomOffset + this.config.topOffset;
    }
}
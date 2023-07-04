import {CardEntry} from "./CardEntry";
import {ICON_SIZE_SMALL, WIDGET_WIDTH} from "../UiParams";

export class DataFieldEntry extends CardEntry {
    constructor(config, screen, positionY) {
        super(config.card ? config.card : {color: 0}, screen, positionY);
        this.rowConfig = {
			color: 0xFFFFFF,
            headlineColor: 0x999999,
			fontSize: this.screen.fontSize,
            headline: "",
            text: "",
            allowOneLine: true,
            ...config,
        };

        this.oneLine = this.rowConfig.allowOneLine && WIDGET_WIDTH >= 300;
        this.config.height = this.rowViewHeight;
    }

    _init() {
        super._init();

        this.headlineView = this.group.createWidget(hmUI.widget.TEXT, this._headlineViewConfig);
        this.textView = this.group.createWidget(hmUI.widget.TEXT, this._textViewConfig);
    }

    _postInit() {
        super._postInit();
		if(this.rowConfig.callback) {
			this.getEvents().ontouch = (e) => this.rowConfig.callback(this, e);
		}
    }

    setText(text, headline=null) {
        this.rowConfig.text = text;
        this.textView.setProperty(hmUI.prop.TEXT, text);
        if(headline !== null) this.headlineView.setProperty(hmUI.prop.TEXT, headline);
        this._text_setHeight(this.rowViewHeight);
    }

    _text_setHeight(height) {
        super.setHeight(height);
        this.textView.setProperty(hmUI.prop.MORE, this._textViewConfig);
    }

    get _headlineViewConfig() {
        return {
            x: ICON_SIZE_SMALL / 2,
            y: 8,
            w: this.oneLine ? 140 : this.textWidth,
            h: 24,
            align_v: hmUI.align.CENTER_V,
            text_size: this.rowConfig.fontSize - 4,
            color: this.rowConfig.headlineColor,
            text: this.rowConfig.headline
		}
    }

    get _textViewConfig() {
        return {
			x: ICON_SIZE_SMALL / 2 + (this.oneLine ? 140 : 0),
			y: this.oneLine ? 0 : 32,
			w: this.textWidth,
			h: this.rowViewHeight - (this.oneLine ? 0 : 32),
            align_h: this.oneLine ? hmUI.align.RIGHT : hmUI.align.LEFT,
			align_v: hmUI.align.CENTER_V,
			text_style: hmUI.text_style.WRAP,
			text_size: this.rowConfig.fontSize,
			color: this.rowConfig.color,
			text: this.rowConfig.text
		}
    }

    get textWidth() {
        const baseWidth = (this.config.width ? this.config.width : WIDGET_WIDTH) - (ICON_SIZE_SMALL / 2);
		return baseWidth - (this.oneLine ? 140 : 8);
    }

    get rowViewHeight() {
		const { height } = hmUI.getTextLayout(this.rowConfig.text, {
			text_size: this.rowConfig.fontSize,
			text_width: this.textWidth
		});
        return height + (this.oneLine ? 8 : 36);
    }
}
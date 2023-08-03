import {CardEntry} from "./CardEntry";
import {ICON_SIZE_SMALL, WIDGET_WIDTH} from "../UiParams";

export class DataFieldEntry extends CardEntry {
    constructor(config, screen, positionY) {
        super(config.card ? config.card : {color: 0}, screen, positionY);
        this.rowConfig = {
			color: 0xFFFFFF,
            headlineColor: 0x999999,
			fontSize: this.screen.fontSize,
            headlineFontSize: this.screen.fontSize - 2,
            headline: "",
            text: "",
            allowOneLine: true,
            headlineWidth: 140,
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
        this.headlineView.setProperty(hmUI.prop.MORE, this._headlineViewConfig);
    }

    get _headlineViewConfig() {
        return {
            x: 0,
            y: 0,
            w: this.oneLine ? this.rowConfig.headlineWidth : this.textWidth,
            h: this.oneLine ? this.rowViewHeight : undefined,
            align_v: this.oneLine ? hmUI.align.CENTER_V : undefined,
            text_style: hmUI.text_style.WRAP,
            text_size: this.rowConfig.headlineFontSize,
            color: this.rowConfig.headlineColor,
            text: this.rowConfig.headline
		}
    }

    get _textViewConfig() {
        return {
			x: this.oneLine ? this.rowConfig.headlineWidth : 0,
			y: this.oneLine ? 0 : this.headHeight,
			w: this.textWidth,
            h: this.oneLine ? this.rowViewHeight : undefined,
            align_h: this.oneLine ? hmUI.align.RIGHT : hmUI.align.LEFT,
            align_v: this.oneLine ? hmUI.align.CENTER_V : undefined,
			text_style: hmUI.text_style.WRAP,
			text_size: this.rowConfig.fontSize,
			color: this.rowConfig.color,
			text: this.rowConfig.text
		}
    }

    get headWidth() {
        const baseWidth = (this.config.width ? this.config.width : WIDGET_WIDTH) - (ICON_SIZE_SMALL / 2);
        if(this.oneLine) return this.rowConfig.headlineWidth;
        return baseWidth;
    }

    get textWidth() {
        const baseWidth = (this.config.width ? this.config.width : WIDGET_WIDTH) - (ICON_SIZE_SMALL / 2);
        if(this.oneLine) return baseWidth - this.rowConfig.headlineWidth;
        return baseWidth;
    }

    get textHeight() {
        const textMetrics = hmUI.getTextLayout(this.rowConfig.text, {
            text_size: this.rowConfig.fontSize,
            text_width: this.textWidth
        });
        return textMetrics.height;
    }

    get headHeight() {
        const headMetrics = hmUI.getTextLayout(this.rowConfig.headline, {
            text_size: this.rowConfig.headlineFontSize,
            text_width: this.headWidth
        });
        return headMetrics.height;
    }

    get rowViewHeight() {
        console.log(this.textHeight, this.headHeight);
        if(this.oneLine) return Math.max(this.textHeight, this.headHeight) + 8;
        return this.textHeight + this.headHeight + 8;
    }
}

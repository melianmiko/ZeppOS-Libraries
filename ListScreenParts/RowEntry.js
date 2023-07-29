import {CardEntry} from "./CardEntry";
import {ICON_SIZE_SMALL, WIDGET_WIDTH} from "../UiParams";

export class RowEntry extends CardEntry {
    constructor(config, screen, positionY) {
        super(config.card ? config.card : {}, screen, positionY);
        this.rowConfig = {
			color: 0xFFFFFF,
			fontSize: this.screen.fontSize,
            ...config,
        };

        this.config.height = this.rowViewHeight;
    }

    _init() {
        super._init();

		this.textView = this.group.createWidget(hmUI.widget.TEXT, this._textViewConfig);
		this.iconView = this.group.createWidget(hmUI.widget.IMG, this._iconViewConfig);

        if(this.rowConfig.description)
            this.descView = this.group.createWidget(hmUI.widget.TEXT, this._descrViewConfig);
    }

    _postInit() {
        super._postInit();
		if(this.rowConfig.callback) {
			this.getEvents().ontouch = (e) => this.rowConfig.callback(this, e);
		}
    }

    setText(text) {
        this.rowConfig.text = text;
        this.textView.setProperty(hmUI.prop.TEXT, text);
        this._text_setHeight(this.rowViewHeight);
    }

    _text_setHeight(height) {
        super.setHeight(height);
        this.textView.setProperty(hmUI.prop.MORE, this._textViewConfig);
        this.iconView.setProperty(hmUI.prop.MORE, this._iconViewConfig);
        if(this.rowConfig.description)
            this.descView.setProperty(hmUI.prop.MORE, this._descrViewConfig);
    }

    get _iconViewConfig() {
        return {
			x: Math.floor(ICON_SIZE_SMALL / 2),
			y: Math.floor((this.rowViewHeight - ICON_SIZE_SMALL) / 2),
			src: this.rowConfig.icon
		}
    }

    get _textViewConfig() {
        return {
			x: ICON_SIZE_SMALL * 2,
			y: 18,
			w: this.textWidth,
			// h: this.rowViewHeight - 36,
			// align_v: hmUI.align.CENTER_V,
			text_style: hmUI.text_style.WRAP,
			text_size: this.rowConfig.fontSize,
			color: this.rowConfig.color,
			text: this.rowConfig.text
		}
    }

   get _descrViewConfig() {
        return {
            x: ICON_SIZE_SMALL * 2,
            y: 18 + this.textHeight,
            w: this.textWidth,
            // h: this.rowViewHeight - 36,
            text_style: hmUI.text_style.WRAP,
            text_size: this.rowConfig.fontSize - 2,
            color: 0x999999,
            text: this.rowConfig.description
        }
    }

    get textWidth() {
		return (this.config.width ? this.config.width : WIDGET_WIDTH) - (ICON_SIZE_SMALL * 2) - 8;
    }

    get textHeight() {
        const { height } = hmUI.getTextLayout(this.rowConfig.text, {
            text_size: this.rowConfig.fontSize,
            text_width: this.textWidth
        });
        return height;
    }

    get descriptionHeight() {
        if(!this.rowConfig.description) return 0;
        const { height } = hmUI.getTextLayout(this.rowConfig.description, {
            text_size: this.rowConfig.fontSize - 2,
            text_width: this.textWidth
        });
        return height;
    }

    get rowViewHeight() {
        return Math.max(this.screen.baseRowHeight, this.textHeight + this.descriptionHeight + 36);
    }
}
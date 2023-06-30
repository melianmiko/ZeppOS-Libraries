import {SCREEN_MARGIN_X, WIDGET_WIDTH} from "../UiParams";
import {TouchEventManager} from "../TouchEventManager";

export class CardEntry {
    constructor(config, screen, positionY) {
        this.screen = screen;
        this.positionY = positionY;
        this._events = null;
        this._eventsBlock = null;
        this.config = {
			color: 0x111111,
			offsetX: 0,
			radius: 8,
			width: WIDGET_WIDTH,
			...config
		};
    }

    getEvents() {
        if(!this._events) {
            this._eventsBlock = this.group.createWidget(hmUI.widget.IMG, this._eventsBlockConfig);
            this._events = new TouchEventManager(this._eventsBlock);
        }
        return this._events;
    }

    _init() {
        this.group = hmUI.createWidget(hmUI.widget.GROUP, this._groupConfig);
		this.bg = this.group.createWidget(hmUI.widget.FILL_RECT, this._bgConfig);
    }

    _card_updateAll() {
        this.group.setProperty(hmUI.prop.MORE, this._groupConfig);
        this.bg.setProperty(hmUI.prop.MORE, this._bgConfig);
        if(this._eventsBlock) this._eventsBlock.setProperty(hmUI.prop.MORE, this._eventsBlockConfig);
    }

    setHeight(height) {
        this.config.height = height;
        this._card_updateAll();
        this.screen.onHeightChange(this);
    }

    _setPositionY(y) {
        this.positionY = y;
        this._card_updateAll();
    }

    get _eventsBlockConfig() {
        return {
            x: 0,
            y: 0,
            w: this.config.width,
            h: this.config.height
        };
    }

    get _groupConfig() {
        return {
			x: SCREEN_MARGIN_X + this.config.offsetX,
			y: this.positionY,
			w: this.config.width,
			h: this.config.height
		};
    }

    get _bgConfig() {
        return {
			x: 0,
			y: 0,
			w: this.config.width,
			h: this.config.height,
			color: this.config.color,
			radius: this.config.radius,
		};
    }

    get viewHeight() {
        if(this.config.dontChangePosY) return 0;
        return this.config.height + 8;
    }
}
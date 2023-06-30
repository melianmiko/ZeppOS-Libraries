import {SCREEN_MARGIN_X, WIDGET_WIDTH} from "../UiParams";
import {TouchEventManager} from "../TouchEventManager";

export class CardEntry {
    constructor(config, screen, positionY) {
        this.screen = screen;
        this.positionY = positionY;
        this._events = null;
        this._eventsBlock = null;
        this._hiddenButton = null;
        this._swipeX = 0;
        this.config = {
			color: 0x111111,
			offsetX: 0,
			radius: 8,
			width: WIDGET_WIDTH,
            hiddenIcon: null,
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
        if(this.config.hiddenButton) {
            this._hiddenButton = hmUI.createWidget(hmUI.widget.BUTTON, this._buttonConfig);
        }

        this.group = hmUI.createWidget(hmUI.widget.GROUP, this._groupConfig);
		this.bg = this.group.createWidget(hmUI.widget.FILL_RECT, this._bgConfig);
    }

    _postInit() {
        if(!this.config.hiddenButton) return;
        let startX = 0;

        const evs = this.getEvents();
        evs.ontouchdown = (e) => {
            startX = e.x;
        };
        evs.ontouchmove = (e) => {
            this._swipeX = -Math.max(0, Math.min(startX - e.x, 96))
            this.group.setProperty(hmUI.prop.MORE, this._groupConfig);
        };
        evs.ontouchup = () => {
            this._swipeX = this._swipeX < -48 ? -96 : 0;
            this.group.setProperty(hmUI.prop.MORE, this._groupConfig);

            if(this._swipeX !== 0) timer.createTimer(3000, 0, () => {
                this._swipeX = 0;
                this.group.setProperty(hmUI.prop.MORE, this._groupConfig);
            })
        }
    }

    _card_updateAll() {
        this.group.setProperty(hmUI.prop.MORE, this._groupConfig);
        this.bg.setProperty(hmUI.prop.MORE, this._bgConfig);
        if(this._hiddenButton) this._hiddenButton.setProperty(hmUI.prop.MORE, this._buttonConfig);
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
			x: SCREEN_MARGIN_X + this._swipeX + this.config.offsetX,
			y: this.positionY,
			w: this.config.width,
			h: this.config.height
		};
    }

    get _buttonConfig() {
        return {
			x: SCREEN_MARGIN_X + this.config.offsetX + this.config.width - 96,
			y: this.positionY,
			w: 96,
			h: this.config.height,
			color: 0xFFFFFF,
			radius: this.config.radius,
            text: this.config.hiddenButton,
            text_size: this.screen.fontSize - 4,
            normal_color: this.screen.accentColor,
            press_color: this.screen.accentColor,
            click_func: this.config.hiddenButtonCallback,
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
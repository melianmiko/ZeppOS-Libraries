import { 
	SCREEN_MARGIN_Y, 
	WIDGET_WIDTH, 
	SCREEN_MARGIN_X, 
	SCREEN_WIDTH, 
	BASE_FONT_SIZE,
	ICON_SIZE_SMALL
} from "./UiParams";
import { TouchEventManager } from "./TouchEventManager";


export class ListScreen {
	constructor() {
		this.positionY = SCREEN_MARGIN_Y;
		this.fontSize = BASE_FONT_SIZE;
		this.accentColor = 0x0077AA;
	}

	build() {}

	headline(text) {
		const lineHeight = Math.floor(BASE_FONT_SIZE * 1.5);
		const widget = hmUI.createWidget(hmUI.widget.TEXT, {
			x: SCREEN_MARGIN_X + 4,
			w: WIDGET_WIDTH - 8,
			h: lineHeight,
			color: this.accentColor,
			align_v: hmUI.align.CENTER_V,
			y: this.positionY,
			text_size: BASE_FONT_SIZE - 4,
			text
		});

		this.positionY += lineHeight;
		return { widget };
	}

	offset(height = SCREEN_MARGIN_Y) {
		hmUI.createWidget(hmUI.widget.IMG, {
			x: 0,
			y: this.positionY,
			w: SCREEN_WIDTH,
			h: height
		})
	}

	twoActionBar(items) {
		if(WIDGET_WIDTH < 300) {
			const row = this.row(items[0]);
			this.row(items[1]);
			return row;
		}

		const secondSize = this.baseRowHeight;
		const firstWidth = WIDGET_WIDTH - secondSize - 8;

		const button = this.card({
			width: secondSize,
			height: secondSize,
			offsetX: firstWidth + 8,
			radius: Math.floor(secondSize / 2),
			color: this.accentColor,
			dontChangePosY: true
		});

		const iconPos = Math.floor((secondSize - ICON_SIZE_SMALL) / 2);
		button.group.createWidget(hmUI.widget.IMG, {
			x: iconPos,
			y: iconPos,
			src: items[1].icon
		});

		const row = this.row({
			...items[0],
			card: {
				width: firstWidth,
				radius: Math.floor(secondSize / 2),
			},
		});

		if(items[1].callback) {
			button.getEvents().ontouch = items[1].callback;
		}

		return row;
	}

	text(userConfig) {
		const config = {
			color: 0xFFFFFF,
			fontSize: this.fontSize,
			card: {},
			...userConfig
		};

		const textWidth = WIDGET_WIDTH - 8;
		const { height } = hmUI.getTextLayout(config.text, {
			text_size: config.fontSize, 
			text_width: textWidth
		});

		const widget = hmUI.createWidget(hmUI.widget.TEXT, {
			x: SCREEN_MARGIN_X + 4,
			y: this.positionY,
			w: textWidth,
			h: height,
			align_v: hmUI.align.CENTER_V,
			text_style: hmUI.text_style.WRAP,
			text_size: config.fontSize,
			color: config.color,
			text: config.text
		});

		this.positionY += height + 4;

		return {
			widget
		}
	}

	row(userConfig) {
		// Merge default config
		const config = {
			color: 0xFFFFFF,
			fontSize: this.fontSize,
			card: {},
			...userConfig
		};

		const textWidth = (config.card.width ? config.card.width : WIDGET_WIDTH) - 44 - 8;
		const { height } = hmUI.getTextLayout(config.text, {
			text_size: config.fontSize, 
			text_width: textWidth
		});

		const viewHeight = Math.max(this.baseRowHeight, height + 36);
		const card = this.card({
			height: viewHeight,
			...config.card,
		});

		card.textView = card.group.createWidget(hmUI.widget.TEXT, {
			x: ICON_SIZE_SMALL * 2,
			y: 0,
			w: textWidth,
			h: viewHeight,
			align_v: hmUI.align.CENTER_V,
			text_style: hmUI.text_style.WRAP,
			text_size: config.fontSize,
			color: config.color,
			text: config.text
		});

		card.iconView = card.group.createWidget(hmUI.widget.IMG, {
			x: Math.floor(ICON_SIZE_SMALL / 2),
			y: Math.floor((viewHeight - ICON_SIZE_SMALL) / 2),
			src: config.icon
		})

		if(config.callback) {
			card.getEvents().ontouch = () => config.callback(card);
		}

		return card;
	}

	checkboxRow(config) {
		let value = !!config.value;

		const row = this.row({
			...config,
			callback: () => {
				value = !value;
				row.iconView.setProperty(hmUI.prop.SRC, 
					value ? config.iconTrue : config.iconFalse);
				config.callback(value);
			}
		});

		row.iconView.setProperty(hmUI.prop.SRC, 
			value ? config.iconTrue : config.iconFalse);
		return row;
	}

	toggleGroup(config) {
		let value = config.value;

		const views = [];

		const callback = (row) => {
			value = row.value;
			for(let i of views)
				i.iconView.setProperty(hmUI.prop.SRC, 
					value == i.value ? config.iconTrue : config.iconFalse);
			config.callback(value);
		};

		for(const item of config.options) {
			const row = this.row({
				text: item.name,
				icon: value == item.value ? config.iconTrue : config.iconFalse,
				callback
			});
			row.value = item.value;
			views.push(row);
		}
	}

	card(userConfig) {
		const config = {
			color: 0x111111,
			offsetX: 0,
			radius: 8,
			width: WIDGET_WIDTH,
			...userConfig
		};

		const group = hmUI.createWidget(hmUI.widget.GROUP, {
			x: SCREEN_MARGIN_X + config.offsetX,
			y: this.positionY,
			w: config.width,
			h: config.height
		});
		const bg = group.createWidget(hmUI.widget.FILL_RECT, {
			x: 0,
			y: 0,
			w: config.width,
			h: config.height,
			color: config.color,
			radius: config.radius,
		});

		if(!config.dontChangePosY) 
			this.positionY += config.height + 8;

		return { 
			group,
			bg,
			config,
			_events: null,
			getEvents() {
				if(!this._events) {
					const cb = this.group.createWidget(hmUI.widget.IMG, {
						x: 0,
						y: 0,
						w: config.width,
						h: config.height
					});
					this._events = new TouchEventManager(cb);
				}

				return this._events;
			}
		}
	}

	get baseRowHeight() {
		if(this.fontSize !== this._brh_lastheight) {
			this._brh_lastheight = this.fontSize
			this._brh_cached = hmUI.getTextLayout(" ", {
				text_size: this.fontSize,
				text_width: 96,
			}).height + 36;
		}
		return this._brh_cached;
	}
}

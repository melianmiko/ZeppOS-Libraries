import {
	BASE_FONT_SIZE,
	ICON_SIZE_SMALL,
	SCREEN_MARGIN_X,
	SCREEN_MARGIN_Y,
	SCREEN_WIDTH,
	WIDGET_WIDTH
} from "./UiParams";
import {CardEntry} from "./ListScreenParts/CardEntry";
import {RowEntry} from "./ListScreenParts/RowEntry";
import {DataFieldEntry} from "./ListScreenParts/DataFieldEntry";
import {TextEntry} from "./ListScreenParts/TextEntry";


export class ListScreen {
	constructor() {
		this.positionY = SCREEN_MARGIN_Y;
		this.fontSize = BASE_FONT_SIZE;
		this.accentColor = 0x0077AA;
		this.entries = [];
	}

	build() {}

	headline(text) {
		const lineHeight = Math.floor(BASE_FONT_SIZE * 1.5);
		const config = {
			x: SCREEN_MARGIN_X + 4,
			w: WIDGET_WIDTH - 8,
			h: lineHeight,
			color: this.accentColor,
			align_v: hmUI.align.CENTER_V,
			y: this.positionY,
			text_size: BASE_FONT_SIZE - 4,
			text
		};
		const widget = hmUI.createWidget(hmUI.widget.TEXT, config);
		const entry = {
			widget,
			viewHeight: lineHeight,
			positionY: this.positionY,
			_setPositionY: (y) => {
				entry.positionY = y;
				widget.setProperty(hmUI.prop.MORE, {
					...config,
					y
				});
			}
		};

		this._registerRow(entry);
		return entry;
	}

	offset(height = SCREEN_MARGIN_Y) {
		const config = {
			x: 0,
			y: this.positionY,
			w: SCREEN_WIDTH,
			h: height
		};

		const entry = {
			widget: hmUI.createWidget(hmUI.widget.IMG, config),
			positionY: this.positionY,
			viewHeight: height,
			_setPositionY(y) {
				entry.positionY = y;
				entry.widget.setProperty(hmUI.prop.MORE, {...config, y});
			}
		};

		this._registerRow(entry);
		return entry;
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
		return this._classBasedEntry(TextEntry, userConfig);
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

		row.iconView.setProperty(hmUI.prop.SRC, value ? config.iconTrue : config.iconFalse);
		return row;
	}

	inage(config) {
		const card = this.card({height: config.height + 8, background: 0});
		card.image = card.group.createWidget(hmUI.align.IMG, {
			x: 0,
			y: 0,
			src: config.src
		});
		return card;
	}

	toggleGroup(config) {
		let value = config.value;

		const views = [];

		const callback = (row) => {
			value = row.value;
			for(let i of views)
				i.iconView.setProperty(hmUI.prop.SRC, 
					value === i.value ? config.iconTrue : config.iconFalse);
			config.callback(value);
		};

		for(const item of config.options) {
			const row = this.row({
				text: item.name,
				icon: value === item.value ? config.iconTrue : config.iconFalse,
				callback
			});
			row.value = item.value;
			views.push(row);
		}
	}

	row(userConfig) {
		return this._classBasedEntry(RowEntry, userConfig);
	}

	field(userConfig) {
		return this._classBasedEntry(DataFieldEntry, userConfig);
	}

	card(userConfig) {
		return this._classBasedEntry(CardEntry, userConfig);
	}

	_classBasedEntry(ClassEntry, userConfig) {
		const entry = new ClassEntry(userConfig, this, this.positionY);
		entry._init();
		entry._postInit();
        this._registerRow(entry);
		return entry;
	}

	onHeightChange(entry) {
		const delta = entry.viewHeight - entry._lastHeight;

		this.positionY += delta;
		entry._lastHeight = entry.viewHeight;

		for(let i = entry._index + 1; i < this.entries.length; i++) {
			this.entries[i]._setPositionY(this.entries[i].positionY + delta);
		}
	}

	_registerRow(data) {
		data._lastHeight = data.viewHeight;
		data._index = this.entries.length;
		this.entries.push(data);
		this.positionY += data.viewHeight;
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

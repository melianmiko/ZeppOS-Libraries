import { ListScreen } from "./ListScreen";
import { ConfigStorage } from "./ConfigStorage";
import { Path } from "./Path";
import { BoardTools } from "./ScreenBoardData/BoardTools";
import { SCREEN_BOARD_VER } from "./ScreenBoardData/VERSION";
import DeviceParams from "./ScreenBoardData/DeviceParams";
import { ICON_SIZE_SMALL } from "./UiParams";

const TRANSLATION_OPTIONS = {
  "en": "English",
  "de-DE": "Deutsch",
  "cs-CZ": "Čeština",
  "hu": "Hungarian",
  "fr-FR": "Français",
  "es-ES": "Español",
  "pt-BR": "Português (Brasileiro)",
  "ru": "Русский",
};

export class ScreenBoardSetup extends ListScreen {
  constructor() {
    super();
    this.accentColor = 0xFF9900;
    this.config = new ConfigStorage(new Path("data", "screenboard.json"));
    this.config.load();
    this.tools = new BoardTools(null, this.config);
  }

  getSupportedLayouts() {
    const selected = [];
    const known = [
      {name: "T9", value: "t9"},
      {name: "T14", value: "t14"},
      {name: "Full", value: "qwerty"},
    ];

    for(let i of known)
      if(DeviceParams.layouts.indexOf(i.value) > -1)
        selected.push(i);

    return selected;
  }

  start() {
    this.headline("Layout:")
    this.toggleGroup({
      options: this.getSupportedLayouts(),
      value: this.config.get("layout", DeviceParams.layouts[0]),
      iconTrue: `screen_board/${ICON_SIZE_SMALL}/true.png`,
      iconFalse: `screen_board/${ICON_SIZE_SMALL}/false.png`,
      callback: (val) => {
        this.config.set("layout", val);
      }
    });

    this.headline("Translations");
    for(const langId in TRANSLATION_OPTIONS)
      this.addLangCheckbox(langId, TRANSLATION_OPTIONS[langId])

    this.headline("About:");
    this.text({
      text: `ScreenBoard, ver.${SCREEN_BOARD_VER}\nby melianmiko`
    });

    this.offset()
  }

  addLangCheckbox(id, title) {
    this.checkboxRow({
      text: title,
      iconTrue: `screen_board/${ICON_SIZE_SMALL}/true.png`,
      iconFalse: `screen_board/${ICON_SIZE_SMALL}/false.png`,
      value: this.config.get("layouts", this.tools.fallbackLayouts).indexOf(id) > -1,
      callback: (newState) => {
        newState ? this.addLang(id) : this.delLang(id)
      }
    });
  }

  addLang(id) {
    let langs = this.config.get("layouts", this.tools.fallbackLayouts);
    langs.push(id);
    this.config.set("layouts", langs);
  }

  delLang(id) {
    let langs = this.config.get("layouts", this.tools.fallbackLayouts);
    langs = langs.filter((i) => i != id);
    this.config.set("layouts", langs);
  }
}
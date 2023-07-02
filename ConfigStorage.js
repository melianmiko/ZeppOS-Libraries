import { Path } from "./Path";

export class ConfigStorage {
  constructor(file=null, defaults=null) {
    this.data = defaults !== null ? defaults : {};

    if(file !== null) {
      this.file = file;
    } else {
      this.file = new Path("data", "config.json");
    }
  }

  get(key, fallback=null) {
    if(this.data[key] !== undefined)
      return this.data[key];
    return fallback;
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  update(rows) {
    for(let key in rows)
      this.data[key] = rows[key];
    this.save();
  }

  save() {
    this.file.overrideWithJSON(this.data);
  }

  wipe() {
    this.data = {};
    this.file.remove();
  }

  load() {
    try {
      this.data = this.file.fetchJSON();
    } catch(e) {}
  }
}
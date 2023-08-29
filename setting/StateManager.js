export class StateManager {
    constructor(context, tag) {
        this.ctx = context;
        this.counter = 0;
        this.tag = tag;
    }

    useState(fallback=null) {
        return this.useSetting(`state_${this.tag}_${this.counter}`, fallback);
    }

    useSetting(key, fallback) {
        let savedValue = null;
        try {
            savedValue = JSON.parse(this.ctx.settingsStorage.getItem(key))
        } catch(e) {}
        this.counter++;

        return [
            savedValue !== null ? savedValue : fallback,
            (v) => {
                this.ctx.settingsStorage.setItem(key, JSON.stringify(v));
            }
        ];
    }

    get(key, fb=null) {
        const val = this.ctx.settingsStorage.getItem(key);
        return val === null ? fb : val;
    }

    set(key, val) {
        this.ctx.settingsStorage.setItem(key, val);
    }
}
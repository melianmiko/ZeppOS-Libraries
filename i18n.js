const preferredLang = [
    DeviceRuntimeCore.HmUtils.getLanguage(),
    "en-US"
];
const strings = {};

export function setPreferedLanguage(val) {
  preferredLang[0] = val;
}

export function listTranslations() {
  return strings.name;
}

export function extendLocale(data) {
  for(let key in data) {
    strings[key] = data[key];
  }
}

export function loadLocale(code, data) {
    // If locale isn't used, ignore
    if(preferredLang.indexOf(code) < 0) return;

    // Load all keys
    for(let key in data) {
        if(!strings[key]) strings[key] = {};
        strings[key][code] = data[key];
    }
}

export function t(key) {
  if(!strings[key]) return key;

  for(let ln of preferredLang) {
    if(!strings[key][ln]) continue;
    return strings[key][ln];
  }

  return key;
}

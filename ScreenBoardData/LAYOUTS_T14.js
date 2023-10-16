export const T14_SYMBOLS = [
  "1", "2", "3", "4", "5", 
  "6", "7", "8", "9", "0", 

  // Symbol packs
  [":", ";", "!", "?"], 
  ["@", "$", "_", "&"] , 
  ["-", "+", "*", "/"], 
  ["(", ")", "%"], 
  ["\"", "'", "#"]
];

export const LAYOUTS_T14 = {
  "en": [
    ["q", "w"], ["e", "r"], ["t", "y"], ["u", "i"], ["o", "p"], 
    ["a", "s"], ["d", "f"], ["g", "h"], ["j", "k"], "l",
    "z", ["x", "c"], ["v", "b"], ["n", "m"], 
    [".", ","],
  ],
  "fr-FR": [
    ["a", "z"], ["e", "r"], ["t", "y"], ["u", "i"], ["o", "p"],
    ["q", "s"], ["d", "f"], ["g", "h"], ["j", "k"], ["l", "m"],
    "w", ["x", "c"],["v", "b"], ["n", "m"], "?",
    [".", ",", "/"]
  ],
  "es-ES": [
    ["q", "w"], ["e", "r"], ["t", "y"], ["u", "i"], ["o", "p"], 
    ["a", "s"], ["d", "f"], ["g", "h"], ["j", "k"], ["l", "ñ"],
    "z", ["x", "c"], ["v", "b"], ["n", "m"], 
    [".", ",", "/"]
  ],
  "pt-BR": [
    ["q", "w"],
    {"er": ["e", "é", "ê", "r"]},
    ["t", "y"],
    {"ui": ["u", "ú", "i", "í"]},
    {"op": ["o", "ó", "õ", "ô", "p"]},
    {"as": ["a", "ã", "â", "á", "à", "s"]},
    ["d", "f"],
    ["g", "h"],
    ["j", "k"],
    "l",
    "z",
    {"xc": ["x", "c", "ç"]},
    ["v", "b"],
    ["n", "m"],
    [".", ","],
  ],
  "hu": [
    ["q", "w"],
    {"er": ["e", "é", "r"]},
    ["t", "z"],
    {"ui": ["u", "ú", "ü", "ű", "i", "í"]},
    {"op": ["o", "ó", "ö", "ő", "p"]},
    {"as": ["a", "á", "s", "ß"]},
    ["d", "f"],
    ["g", "h"], ["j", "k"],
    "l", "y",
    ["x", "c"],
    ["v", "b"],
    ["n", "m"],
    [".", ","],
  ],
  "ru": [
    ["й", "ц"], ["у", "к"], ["е", "н"], ["г", "ш", "щ"], ["з", "х", "ъ"], 
    ["ф", "ы"], ["в", "а"], ["п", "р"], ["о", "л"], ["д", "ж", "э"],
    ["я", "ч", "с"], ["м", "и", "т"], ["ь", "б"], "ю",
    [".", ","],
  ],
  "numbers": [
    "1", "2", "3", "4", "5", "6", "7", "8", "9",  "0",
    ...Array(17).fill("")
  ],
}

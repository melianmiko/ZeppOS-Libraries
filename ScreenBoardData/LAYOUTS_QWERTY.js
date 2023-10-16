export const QWERTY_SYMBOLS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9",  "0",
  "@", "$", "_", "&", "-", "+", "(", ")", "/",
  "*", "\"", "'", ":", ";", "!", "?", "#",
];

export const LAYOUTS_QWERTY = {
  "en": [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l",
    "z", "x", "c", "v", "b", "n", "m",
    [".", ",", "/"]
  ],
  "fr-FR": [
    "a", "z", "e", "r", "t", "y", "u", "i", "o", "p",
    "q", "s", "d", "f", "g", "h", "j", "k", "l",
    "w", "x", "c", "v", "b", "n", "m",
    [".", ",", "/"]
  ],
  "es-ES": [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", ["l", "ñ"],
    "z", "x", "c", "v", "b", "n", "m",
    [".", ",", "/"]
  ],
  "pt-BR": [
    // Row 1
    "q", "w",
    {"e": ["e", "é", "ê"]},
    "r", "t", "y",
    {"u": ["u", "ú"]},
    {"i": ["i", "í"]},
    {"o": ["o", "ó", "õ", "ô"]},
    "p",
    // Row 2
    {"a": ["a", "ã", "â", "á", "à"]},
    "s", "d", "f", "g", "h", "j", "k", "l",
    // Row 3
    "z", "x",
    {"c": ["c", "ç"]},
    "v", "b", "n", "m",
    // Row 4
    [".", ",", "/"]
  ],
  "hu": [
    // Row 1
    "q", "w",
    {"e": ["e", "é"]},
    "r", "t", "z",
    {"u": ["u", "ú", "ü", "ű"]},
    {"i": ["i", "í"]},
    {"o": ["o", "ó", "ö", "ő"]},
    "p",
    // Row 2
    {"a": ["a", "á"]},
    {"s": ["s", "ß"]},
    "d", "f", "g", "h", "j", "k", "l",
    // Row 3
    "y", "x", "c", "v", "b", "n", "m",
    // Extra
    [".", ",", "/"]
  ],
  "ru": [
    "й", "ц", "у", "к", "е", "н", "г", ["ш", "щ"], "з", "х",
    "ф", "ы", "в", "а", "п", "р", "о", ["л", "д"], ["ж", "э"],
    "я", ["ч", "с"], "м", "и", "т", ["ь", "ъ"], ["б", "ю"],
    [".", ",", "ё"]
  ],
  "numbers": [
    "1", "2", "3", "4", "5", "6", "7", "8", "9",  "0",
    ...Array(17).fill("")
  ]
}

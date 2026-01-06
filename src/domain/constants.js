export const MENUS = {
  "양송이수프": { price: 6000, type: "appetizer" },
  "타파스": { price: 5500, type: "appetizer" },
  "시저샐러드": { price: 8000, type: "appetizer" },

  "티본스테이크": { price: 55000, type: "main" },
  "바비큐립": { price: 54000, type: "main" },
  "해산물파스타": { price: 35000, type: "main" },
  "크리스마스파스타": { price: 25000, type: "main" },

  "초코케이크": { price: 15000, type: "dessert" },
  "아이스크림": { price: 5000, type: "dessert" },

  "제로콜라": { price: 3000, type: "drink" },
  "레드와인": { price: 60000, type: "drink" },
  "샴페인": { price: 25000, type: "drink" }
};

export const EVENT_CONSTANTS = {
  DDAY_START: 1,
  DDAY_END: 25,
  DDAY_BASE_DISCOUNT: 1000,
  DDAY_PER_DAY: 100,

  WEEKDAY_DESSERT_DISCOUNT: 2023,
  WEEKEND_MAIN_DISCOUNT: 2023,
  SPECIAL_DISCOUNT: 1000,

  GIFT_THRESHOLD: 120000,
  GIFT_MENU_NAME: "샴페인",

  BADGE: {
    SANTA: 20000,
    TREE: 10000,
    STAR: 5000
  },

  STAR_DATES: [3, 10, 17, 24, 25, 31],
  MIN_ORDER_PRICE_FOR_EVENT: 10000,
  MAX_MENU_COUNT: 20
};

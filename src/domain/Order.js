import { MENUS, EVENT_CONSTANTS } from "./constants.js";

class Order {
  constructor(orderString) {
    this.items = {};
    this.totalPrice = 0;
    this.mainCount = 0;
    this.dessertCount = 0;
    this.drinkCount = 0;

    this.parse(orderString);
    this.validateTotalCount();
    this.validateNotDrinkOnly();
  }

  parse(orderString) {
    if (!orderString || typeof orderString !== "string") {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }

    orderString = orderString.trim();
    const parts = orderString.split(",");

    for (let i = 0; i < parts.length; i++) {
      const raw = parts[i].trim();
      const tokens = raw.split("-");

      if (tokens.length !== 2) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }

      const name = tokens[0].trim();
      const count = parseInt(tokens[1].trim(), 10);

      if (!MENUS[name]) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }

      if (isNaN(count) || count <= 0) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }

      if (Object.prototype.hasOwnProperty.call(this.items, name)) {
        // 중복 메뉴
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }

      this.items[name] = count;
    }

    this.calculateSummary();
  }

  calculateSummary() {
    this.totalPrice = 0;
    this.mainCount = 0;
    this.dessertCount = 0;
    this.drinkCount = 0;

    for (const name in this.items) {
      const count = this.items[name];
      const menu = MENUS[name];

      this.totalPrice += menu.price * count;

      if (menu.type === "main") this.mainCount += count;
      if (menu.type === "dessert") this.dessertCount += count;
      if (menu.type === "drink") this.drinkCount += count;
    }
  }

  validateTotalCount() {
    let sum = 0;
    for (const name in this.items) {
      sum += this.items[name];
    }

    if (sum > EVENT_CONSTANTS.MAX_MENU_COUNT) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  validateNotDrinkOnly() {
  let total = 0;

  for (const name in this.items) {
    total += this.items[name];
  }

  if (this.drinkCount === total) {
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
}


  getTotalPrice() {
    return this.totalPrice;
  }

  getMainCount() {
    return this.mainCount;
  }

  getDessertCount() {
    return this.dessertCount;
  }

  getItems() {
    return this.items;
  }
}

export default Order;

import { EVENT_CONSTANTS, MENUS } from "./constants.js";

class DiscountResult {
  constructor() {
    this.ddayDiscount = 0;
    this.weekdayWeekendDiscount = 0;
    this.specialDiscount = 0;

    this.giftMenuName = "없음";
    this.giftPrice = 0;

    this.totalDiscountAmount = 0;  // 할인 합계
    this.totalBenefitAmount = 0;   // 할인 + 증정
    this.finalPaymentAmount = 0;
    this.badge = "없음";
  }
}

class DiscountCalculator {
  constructor(visitDate, order) {
    this.visitDate = visitDate;
    this.order = order;
  }

  calculate() {
    const result = new DiscountResult();
    const totalPrice = this.order.getTotalPrice();

    if (totalPrice < EVENT_CONSTANTS.MIN_ORDER_PRICE_FOR_EVENT) {
      result.finalPaymentAmount = totalPrice;
      return result;
    }

    // 1) D-Day
    result.ddayDiscount = this.visitDate.getDdayDiscount();

    // 2) 평일/주말
    if (this.visitDate.isWeekday()) {
      result.weekdayWeekendDiscount =
        this.order.getDessertCount() * EVENT_CONSTANTS.WEEKDAY_DESSERT_DISCOUNT;
    } else {
      result.weekdayWeekendDiscount =
        this.order.getMainCount() * EVENT_CONSTANTS.WEEKEND_MAIN_DISCOUNT;
    }

    // 3) 특별 할인
    result.specialDiscount = this.visitDate.getSpecialDiscount();

    // 4) 증정
    if (totalPrice >= EVENT_CONSTANTS.GIFT_THRESHOLD) {
      result.giftMenuName = EVENT_CONSTANTS.GIFT_MENU_NAME;
      result.giftPrice = MENUS[result.giftMenuName].price;
    }

    // 5) 합계
    result.totalDiscountAmount =
      result.ddayDiscount +
      result.weekdayWeekendDiscount +
      result.specialDiscount;

    result.totalBenefitAmount =
      result.totalDiscountAmount +
      result.giftPrice;

    result.finalPaymentAmount = totalPrice - result.totalDiscountAmount;

    // 6) 배지
    const benefit = result.totalBenefitAmount;
    if (benefit >= EVENT_CONSTANTS.BADGE.SANTA) result.badge = "산타";
    else if (benefit >= EVENT_CONSTANTS.BADGE.TREE) result.badge = "트리";
    else if (benefit >= EVENT_CONSTANTS.BADGE.STAR) result.badge = "별";

    return result;
  }
}

export default DiscountCalculator;

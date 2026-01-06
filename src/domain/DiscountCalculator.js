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
    this.visitDate = visitDate; //visitDate 객체 
    this.order = order; //order 객체
  }

  calculate() {
    const result = new DiscountResult();
    const totalPrice = this.order.getTotalPrice();
    // 빈 결과 상자 만들고, 총 주문 금액 가져오기 

    if (totalPrice < EVENT_CONSTANTS.MIN_ORDER_PRICE_FOR_EVENT) {
      result.finalPaymentAmount = totalPrice;
      return result;
    }
    // 만약 10,000 미만이면 이벤트 안 함

    // 1) D-Day
    result.ddayDiscount = this.visitDate.getDdayDiscount();
    // VisitDate가 계산해줌. 만약, 3일이라면 1200원

    // 2) 평일/주말
    if (this.visitDate.isWeekday()) {
      result.weekdayWeekendDiscount =
        this.order.getDessertCount() * EVENT_CONSTANTS.WEEKDAY_DESSERT_DISCOUNT;
    } else {
      result.weekdayWeekendDiscount =
        this.order.getMainCount() * EVENT_CONSTANTS.WEEKEND_MAIN_DISCOUNT;
    }
    //  평일 → 디저트당 2023원
    // 주말 → 메인당 2023원

    // 3) 특별 할인
    result.specialDiscount = this.visitDate.getSpecialDiscount();

    // 4) 증정
    if (totalPrice >= EVENT_CONSTANTS.GIFT_THRESHOLD) {
      result.giftMenuName = EVENT_CONSTANTS.GIFT_MENU_NAME;
      result.giftPrice = MENUS[result.giftMenuName].price;
    }
    // ✔ 120,000 이상, 샴페인 증정, 가격: 25,000 (혜택에만 포함)

    // 5) 합계
    // 살제 할인 (깎이는 금액)
    result.totalDiscountAmount =
      result.ddayDiscount +
      result.weekdayWeekendDiscount +
      result.specialDiscount;


    // 총 혜택 = 할인 + 증정
    result.totalBenefitAmount =
      result.totalDiscountAmount +
      result.giftPrice;

    // 최종 결제 금액
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

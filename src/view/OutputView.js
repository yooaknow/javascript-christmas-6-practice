import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printGreeting() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },

  printPreview(day) {
    Console.print(`12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },

  printMenu(order) {
    Console.print("<주문 메뉴>");
    const items = order.getItems();

    for (const name in items) {
      Console.print(`${name} ${items[name]}개`);
    }
  },

  printTotalPrice(price) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(`${price.toLocaleString()}원`);
  },

  printGift(name) {
    Console.print("<증정 메뉴>");
    Console.print(name);
  },

  printBenefits(result) {
    Console.print("<혜택 내역>");

    const noBenefits =
      result.ddayDiscount === 0 &&
      result.weekdayWeekendDiscount === 0 &&
      result.specialDiscount === 0 &&
      result.giftPrice === 0;

    if (noBenefits) {
      Console.print("없음");
      return;
    }

    if (result.ddayDiscount > 0) {
      Console.print(
        `크리스마스 디데이 할인: -${result.ddayDiscount.toLocaleString()}원`
      );
    }

    if (result.weekdayWeekendDiscount > 0) {
      Console.print(
        `평일 할인: -${result.weekdayWeekendDiscount.toLocaleString()}원`
      );
    }

    if (result.specialDiscount > 0) {
      Console.print(
        `특별 할인: -${result.specialDiscount.toLocaleString()}원`
      );
    }

    if (result.giftPrice > 0) {
      Console.print(
        `증정 이벤트: -${result.giftPrice.toLocaleString()}원`
      );
    }
  },

  printBenefitTotal(amount) {
    Console.print("<총혜택 금액>");
    Console.print(`-${amount.toLocaleString()}원`);
  },

  printFinal(price) {
    Console.print("<할인 후 예상 결제 금액>");
    Console.print(`${price.toLocaleString()}원`);
  },

  printBadge(badge) {
    Console.print("<12월 이벤트 배지>");
    Console.print(badge);
  },

  printError(message) {
    Console.print(message);
  }
};

export default OutputView;

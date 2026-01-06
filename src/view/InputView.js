/* 
inputview.js 에서 예상 방문 날짜 잡기 
안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.
12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)

방문할 날짜는 1 이상 31 이하의 숫자로만 입력받아 주세요.
1 이상 31 이하의 숫자가 아닌 경우, "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
모든 에러 메시지는 "[ERROR]"로 시작하도록 작성해 주세요.

*/

import { Console } from "@woowacourse/mission-utils";

class InputView {
  async Start() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  }

    async readDay() {
    const inputDay = await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)");
    return inputDay;
  }

  async readMenu() {
    const inputMenu = await Console.readLineAsync("주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)");
    return inputMenu;
  }

}

export default InputView;
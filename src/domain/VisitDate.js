import { EVENT_CONSTANTS } from "./constants.js";

class VisitDate {
  constructor(dayString) {
    const day = parseInt(dayString, 10);

    if (isNaN(day) || day < 1 || day > 31) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }

    this.day = day;
  }

  isWeekend() {
    const date = new Date(2023, 11, this.day); // 11 = 12월
    // 원래 자바스크립트에 있는 기능 -> Sun Dec 03 2023 00:00:00 이렇게 나옴
    const weekday = date.getDay(); // 0=일, 6=토
    return weekday === 0 || weekday === 6;
    // 0이거나 6이면 true를 반환
  }

  isWeekday() {
    return !this.isWeekend();
  }

  isStarDay() {
    return EVENT_CONSTANTS.STAR_DATES.includes(this.day);
  }
  //includes가 하는 것 -> 배열 안에 값이 있으면 true, 없으면 false

  getDdayDiscount() {
    if (this.day < EVENT_CONSTANTS.DDAY_START || this.day > EVENT_CONSTANTS.DDAY_END) {
      return 0;
    }

    return (
      EVENT_CONSTANTS.DDAY_BASE_DISCOUNT +
      (this.day - 1) * EVENT_CONSTANTS.DDAY_PER_DAY
    );
  }

// D-day 기간 아니면 0원,
//기간 안이면 날짜에 맞춰 할인 금액 계산해서 반환

  getSpecialDiscount() {
    if (this.isStarDay()) {
      return EVENT_CONSTANTS.SPECIAL_DISCOUNT;
    }
    return 0;
  }
}
// 별날이면 1000원, 아니면 0원

export default VisitDate;

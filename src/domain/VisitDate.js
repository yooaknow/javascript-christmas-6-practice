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
    const weekday = date.getDay(); // 0=일, 6=토
    return weekday === 0 || weekday === 6;
  }

  isWeekday() {
    return !this.isWeekend();
  }

  isStarDay() {
    return EVENT_CONSTANTS.STAR_DATES.includes(this.day);
  }

  getDdayDiscount() {
    if (this.day < EVENT_CONSTANTS.DDAY_START || this.day > EVENT_CONSTANTS.DDAY_END) {
      return 0;
    }

    return (
      EVENT_CONSTANTS.DDAY_BASE_DISCOUNT +
      (this.day - 1) * EVENT_CONSTANTS.DDAY_PER_DAY
    );
  }

  getSpecialDiscount() {
    if (this.isStarDay()) {
      return EVENT_CONSTANTS.SPECIAL_DISCOUNT;
    }
    return 0;
  }
}

export default VisitDate;

import VisitDate from "../domain/VisitDate.js";
import Order from "../domain/Order.js";
import DiscountCalculator from "../domain/DiscountCalculator.js";

class AppController {
  constructor(inputView, outputView) {
    this.inputView = inputView;
    this.outputView = outputView;
  }

  async readValidDate() {
    // 잘못 입력하면 다시
    while (true) {
      try {
        const value = await this.inputView.readDate();
        return new VisitDate(value);

        /*
          VisitDate 객체 반환
          {
            day: 3,
            isWeekend: function...
            isWeekday: function...
            isStarDay: function...
            getDdayDiscount: function...
            getSpecialDiscount: function...
          }
        */
      } catch (error) {
        this.outputView.printError(error.message);
      }
    }
  }

  async readValidOrder() {
    while (true) {
      try {
        const value = await this.inputView.readOrder();
        return new Order(value);
      } catch (error) {
        this.outputView.printError(error.message);
      }
    }
  }

  async run() {
    this.outputView.printGreeting();

    const visitDate = await this.readValidDate();
    const order = await this.readValidOrder();

    const calculator = new DiscountCalculator(visitDate, order);
    const result = calculator.calculate();

    this.outputView.printPreview(visitDate.day);
    this.outputView.printMenu(order);
    this.outputView.printTotalPrice(order.getTotalPrice());
    this.outputView.printGift(result.giftMenuName);
    this.outputView.printBenefits(result);
    this.outputView.printBenefitTotal(result.totalBenefitAmount);
    this.outputView.printFinal(result.finalPaymentAmount);
    this.outputView.printBadge(result.badge);
  }
}

export default AppController;

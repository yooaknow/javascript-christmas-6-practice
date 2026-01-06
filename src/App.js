import AppController from "./controller/AppController.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";

class App {
  async run() {
    const controller = new AppController(InputView, OutputView);
    await controller.run();
  }
}

export default App;

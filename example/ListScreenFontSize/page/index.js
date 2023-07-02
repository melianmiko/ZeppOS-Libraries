import {FontSizeSetupScreen} from "../../../FontSizeSetupScreen";

Page({
  onInit() {
    new FontSizeSetupScreen().start();
  },
  onDestroy() {
  }
});

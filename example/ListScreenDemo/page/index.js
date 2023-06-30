import {ListScreen} from "../../../ListScreen";

class TestScreen extends ListScreen {
  start() {
    this.row({
      text: "Row 1",
      callback: (card, event) => {
        console.log(card, event);
      },
      card: {
        hiddenButton: "Edit",
        hiddenButtonCallback: () => {
          console.log("SSSSSSSSSSS");
        }
      }
    })

    const textRow = this.row({
      text: "Row 2",
      callback: () => {
        textRow.setText("Sus Sus Sus Sus Sus Sus Sus Sus Sus Sus Sus Sus Sus ")
      }
    })

    this.headline("Headline");
    this.row({
      text: "Row 3",
    });
    this.text({text: "hello, world!!!"})
    this.offset();
  }
}

Page({
  onInit() {
    new TestScreen().start();
  },
});

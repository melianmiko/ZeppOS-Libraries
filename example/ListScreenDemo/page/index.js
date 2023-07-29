import {ListScreen} from "../../../ListScreen";

class TestScreen extends ListScreen {
  start() {
    this.field({
      headline: "Field",
      text: "Hello, world",
    })
    const f = this.field({
      headline: "Field",
      text: "Hello, world",
      callback: () => {
        f.setText("sus sus sus sus sus sus sus sus sus sus ")
      }
    })
    this.field({
      headline: "Field",
      text: "Hello, world world world world world world world ",
    })
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
      description: "Description! AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA ",
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

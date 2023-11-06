import { LightningElement } from "lwc";

export default class C2p_chiledComponent extends LightningElement {
  isSelected = true;
  number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  handleButtonClick(event) {
    const evt = new CustomEvent("btnevent", {
      detail: event.target.dataset.name
    });

    this.dispatchEvent(evt);
  }
}
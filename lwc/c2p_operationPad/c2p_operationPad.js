import { LightningElement } from 'lwc';

export default class C2p_operationPad extends LightningElement {

    operation = ["+", "-", "*", "/", "c", "="];

    handleOperationClick(event) {
        if (event.target.dataset.name === "=" || event.target.dataset.name === "c") {
          const evt = new CustomEvent("calculate", {
            detail: event.target.dataset.name
          });
          this.dispatchEvent(evt);
        } else {
          const evt = new CustomEvent("operation", {
            detail: event.target.dataset.name
          });
          this.dispatchEvent(evt);
        }
      }
}
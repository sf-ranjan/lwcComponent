import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MSGCHANNEL from '@salesforce/messageChannel/Custom__c'

export default class LmsPublisherlwc extends LightningElement {
    inputValue;

    @wire(MessageContext)
    contextData;

    handlePublish(){
        const message = {
            operator:{
                value:this.inputValue
            }
        }
        publish(this.contextData, MSGCHANNEL, message);
    }

    handlekeyUp(event){
        this.inputValue = event.target.value;

    }

}
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MSGCHANNEL from '@salesforce/messageChannel/Custom__c'

export default class LmsPublisherlwc extends LightningElement {

    @wire(MessageContext)
    contextData;

    handlePublish(event){
        const message = {
            operator:{
                value:event.target.value//this.inputValue
            }
        }
        publish(this.contextData, MSGCHANNEL, message);
    }
}
import { LightningElement, wire } from 'lwc';
import MSGCHANNEL from '@salesforce/messageChannel/Custom__c';
import {MessageContext, subscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class LmsSubscriber extends LightningElement {
    recivedMsg;

    @wire(MessageContext)
    msgContext;

    connectedCallback(){
        this.handleSubscribe();
    }

    handleSubscribe(){
        subscribe(this.msgContext, 
            MSGCHANNEL, 
            (message) => this.handleMessage(message), { scope: APPLICATION_SCOPE });

    }

    handleMessage(message){
        this.recivedMsg = message.operator.value? message.operator.value:'';

    }
   

}
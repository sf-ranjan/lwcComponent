import { LightningElement, track } from 'lwc';

export default class C2p_ParentComponent extends LightningElement {
    @track number='';
    @track operator;
    @track currentNum='';
    result;
    equalsTo;
    
    handleEvent(event){
        if(this.operator===undefined && this.result===undefined){
            this.number += event.detail;
        }else if(this.operator!==undefined){
                this.currentNum += event.detail;
        }
       
    }
    handleOperation(event){
        if(this.result===undefined){
            this.operator = event.detail;
        }else{
            this.number=this.result;
            this.currentNum='';
            this.result=undefined;
            this.equalsTo=undefined;
            this.operator=event.detail;
        }
          
    }

    handleCalc(event){
        if(event.detail!=='c'){
            if(this.result===undefined){
                this.equalsTo='=';
                let num = parseInt(this.number, 10);
                let secnum = parseInt(this.currentNum,10);
                if(this.operator==='+'){
                    this.result= num+secnum;
                }else if(this.operator==='*'){
                    this.result=num*secnum;
                }else if(this.operator==='/'){
                    this.result=num/secnum;
                }else if(this.operator==='-'){
                    this.result=num-secnum;
                }
        }
        }else{
            this.number = '';
            this.operator=undefined;
            this.currentNum='';
            this.result = undefined;
            this.equalsTo=undefined;
        }

    }
}
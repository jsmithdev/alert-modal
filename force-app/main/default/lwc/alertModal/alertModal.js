import { api, wire, LightningElement } from 'lwc';

import checkField from '@salesforce/apex/AlertModal.checkField';
import { getRecord } from 'lightning/uiRecordApi';

export default class AlertModal extends LightningElement {

    @api recordId

    @api title
    @api body
    @api variant
    @api size
    @api field_to_check

    active = false
    text_color = '#FFF'
    
    fields = ''

    get showModal(){return this._open}
    set showModal(value){ this._open = value}


    @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
    checkField({ data, error }) {
        if (data) {
            this._object = data
            this.apiName = this._object.apiName
            this.field_to_check.split(',').map(objField => {
                const field = objField.split('.')[1]
                if(this._object.fields[field].value){
                    this.active = true
                }
            })
        }
        else if (error) {
            console.log("Error");
        }
        this.debug()
    }

    connectedCallback(){
        this.fields = this.field_to_check.split(',')
        this.debug()
    }
/* 
    async connectedCallback() {
        if(!this.init && this.field_to_check && this.recordId){
            
            const recordId = this.recordId;
            const field = this.field_to_check;

            if(recordId && field){
                console.log('HAAS RECORD+FIELD' )
                this._object = await checkField({recordId, field})
                if(this._object[field]){


                    console.log('THIS IS TRUTHY')
                    this.active = true
                }
                this.debug()
            } 
        }
    }*/

    get headerClassList(){
        return `slds-modal__header ${this.variant}`
    }

    get modalClassList(){

        if(this.size === 'large'){
            return 'slds-modal slds-fade-in-open slds-modal_large'
        }
        else if(this.size === 'small')      {
            return 'slds-modal slds-fade-in-open slds-modal_small'
        }

        return 'slds-modal slds-fade-in-open slds-modal_medium'
    }

    close(){
        this.active = false
        this.dispatch('close')
    }

    debug(){
        console.log(JSON.parse(JSON.stringify({
            apiName: this.apiName,
            object: this._object,
            title: this.title,
            body: this.body,
            color: this.color,
            field_to_check: this.field_to_check,
            recordId: this.recordId,
        })))
    }
}
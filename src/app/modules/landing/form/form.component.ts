import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import { Subject } from 'rxjs';

@Component({
    selector     : 'app-form',
    templateUrl  : './form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    form: UntypedFormGroup
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder
    )
    {
    }
    ngOnInit(): void {

        this.form = this._formBuilder.group({
            cardNumber    : ['', [CreditCardValidators.validateCCNumber]],
            cardExpiration: ['', [CreditCardValidators.validateExpDate]],
            cardCVC       : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
        })
    }

    ngOnDestroy(): void {
    }

    confirm() {
        // console.log(this.form.getRawValue());

        const cardNumber = this.form.get('cardNumber').value;
        const cardExpiration = this.form.get('cardExpiration').value; 
        const cardCVC = this.form.get('cardCVC').value;

        let formattedCardNo = cardNumber.replace(/\s+/g, '');
        let cardExpiryMonth = cardExpiration.split('/')[0].trim();
        let cardExpiryYear = cardExpiration.split('/')[1].trim();

        // console.log(+formattedCardNo);
        // console.log(+cardExpiryMonth);
        // console.log(+cardExpiryYear);
        
    }
}

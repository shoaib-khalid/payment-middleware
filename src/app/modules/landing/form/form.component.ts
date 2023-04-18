import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreditCardValidators } from 'angular-cc-library';
import { Subject } from 'rxjs';
import { FormValidationService } from './form.validation.service';
import { BNPLList, BetterPayment } from 'app/core/services/types/payment.types';
import { PaymentService } from 'app/core/services/payment.service';

@Component({
    selector     : 'app-form',
    templateUrl  : './form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    form: UntypedFormGroup
    formType: string = '';
    transactionId: string = '';
    bnplPage: boolean = true;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _route: ActivatedRoute,
        private _paymentService: PaymentService
    )
    {
        this.formType = this._route.snapshot.paramMap.get('formType'); // card / bnpl
        this.transactionId = this._route.snapshot.paramMap.get('transactionId');

        if (this.formType === 'card') {
            this.form = this._formBuilder.group({
                cardNumber      : ['', [CreditCardValidators.validateCCNumber]],
                cardExpiration  : ['', [CreditCardValidators.validateExpDate]],
                cardCVC         : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
                name            : ['', [Validators.required]],
                phoneNo         : ['', [Validators.required, FormValidationService.phoneNumberValidator]],
                email           : ['', [FormValidationService.emailValidator]],
            })
        }
        else if (this.formType === 'bnpl') {
            this.form = this._formBuilder.group({
                name        : ['', [Validators.required]],
                phoneNo     : ['', [Validators.required, FormValidationService.phoneNumberValidator]],
                email       : ['', [FormValidationService.emailValidator]],

            })
        }
    }
    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    confirm() {

        // Form Type Card
        if (this.formType === 'card') {

            const formattedCardNo = this.form.get('cardNumber').value.replace(/\s+/g, '');
            const cardCVC = this.form.get('cardCVC').value;

            const cardExpiry= this.form.get('cardExpiration').value; 
            const cardExpiryMonth = cardExpiry.split('/')[0].trim();
            const cardExpiryYear = cardExpiry.split('/')[1].trim();
                
            const betterPayRequest: BetterPayment = {
                cardCCV: cardCVC,
                cardMonth: cardExpiryMonth,
                cardYear: cardExpiryYear,
                creditCardNo: formattedCardNo,
                customerName: this.form.get('name').value,
                // orderTotalAmount: 0,
                paymentService: 'CREDIT', // Atome
                paymentType: 'CREDIT', // BNPL
                transactionId: this.transactionId,
                phoneNo: this.form.get('phoneNo').value,
                email: this.form.get('email').value
            }

            // Post to payment service
            this._paymentService.postBetterPayment(betterPayRequest)
                .subscribe((response) => {

                    if (response && response.paymentUrl) {
                        window.location.href = response.paymentUrl;
                    }

                })
        }
        // Form Type BNPL
        else if (this.formType === 'bnpl') {

            this.bnplPage = true;
        }

        
    }

    /**
     * Emitted on click Proceed
     * 
     * @param value 
     */
    confirmBNPL(value: BNPLList) {

        const betterPayRequest: BetterPayment = {
            customerName: this.form.get('name').value,
            // orderTotalAmount: 0,
            paymentService: value.providerValue, // Atome
            paymentType: value.type, // BNPL
            transactionId: this.transactionId,
            phoneNo: this.form.get('phoneNo').value,
            email: this.form.get('email').value
        }

        // Post to payment service
        this._paymentService.postBetterPayment(betterPayRequest)
        .subscribe((response) => {

            if (response && response.paymentUrl) {
                window.location.href = response.paymentUrl;
            }

        })
        
    }
}

import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'app/config/service.config';
import { PaymentService } from 'app/core/services/payment.service';
import { PaymentRequestResp } from 'app/core/services/types/payment.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'app-pay-later',
    templateUrl  : './pay-later.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PayLaterComponent
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    qrUrl: string = '';
    
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _paymentService: PaymentService
    )
    {
    }
        
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._paymentService.paymentRequest$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((payment: PaymentRequestResp) => {
                if (payment) {
                    this.qrUrl = 'https://' + AppConfig.settings.paymentMiddleware + '/form/bnpl/' + payment.systemTransactionId;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

    }

     /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    navigate() {
        this._router.navigate(['/pay-later-form'], {relativeTo: this._activatedRoute});
        // this._router.navigate(['./', newContact.id], {relativeTo: this._activatedRoute});
    }
}

import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConfig } from 'app/config/service.config';
import { StoresService } from 'app/core/services/store.service';
import { Subject, combineLatest, map, of, switchMap, takeUntil } from 'rxjs';
import { PaymentRequestResp } from 'app/core/services/types/payment.types';
import { PaymentService } from 'app/core/services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'app-online-payment',
    templateUrl  : './online-payment.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OnlinePaymentComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    qrUrl: string = '';
    orderId: string = '';
    storeId: string = '';

    /**
     * Constructor
     */
    constructor(
        private _route: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _paymentService: PaymentService
    )
    {
        this.orderId = this._route.snapshot.queryParamMap.get('orderId');
        this.storeId = this._route.snapshot.queryParamMap.get('storeId');
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
                    this.qrUrl = 'https://' + AppConfig.settings.paymentMiddleware + '/form/card/' + payment.systemTransactionId + 
                        '?storeId=' + this.storeId + '&orderId=' + this.orderId;
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
}

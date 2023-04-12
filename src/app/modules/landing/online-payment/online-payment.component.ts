import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConfig } from 'app/config/service.config';
import { Order } from 'app/core/services/types/order.types';
import { StoresService } from 'app/core/services/store.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'app-online-payment',
    templateUrl  : './online-payment.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OnlinePaymentComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    qrUrl: string = '';

    /**
     * Constructor
     */
    constructor(
        private _storesService: StoresService,
        private _changeDetectorRef: ChangeDetectorRef,
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
        this._storesService.order$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((order: Order) => {
                if (order) {
                    this.qrUrl = 'https://' + AppConfig.settings.paymentMiddleware + '/form/' + order.invoiceId;
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

    close() {
        window.close();
    }
    open() {
        document.location.reload();    
    }
}

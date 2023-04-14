import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { AppConfig } from "app/config/service.config";

@Component({
    selector     : 'thankyou',
    templateUrl  : './thankyou.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThankYouComponent
{
    params : {
        serviceType     : string;
        completionStatus: string;
        paymentType     : string;
        status          : string;
    }

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _activatedRoute: ActivatedRoute,
        private _apiServer: AppConfig
    )
    {        
        this.params = this._activatedRoute.snapshot.paramMap['params']        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
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

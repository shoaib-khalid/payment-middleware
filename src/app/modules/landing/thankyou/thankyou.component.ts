import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, interval, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
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
    channel : string = '';
    countdown : number = 5;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };

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
        this.params = this._activatedRoute.snapshot.paramMap['params'];
        this.channel = this._activatedRoute.snapshot.queryParams['channel'] ?? '';                
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Redirect after the countdown
        interval(1000)
            .pipe(
                finalize(() => {

                    if (this.channel === 'DELIVERIN') {
                        this._document.location.href = 'https://' + this._apiServer.settings.marketplaceDomain;
                    }
                    
                    // if (this.params.serviceType === 'DINEIN')
                    // {
                    //     this._document.location.href = 'https://' + this._apiServer.settings.dineInDomain + '/order-history';
                    // }
                    // else if (this.params.serviceType === 'DELIVERIN')
                    // {
                    //     this._document.location.href = 'https://' + this._apiServer.settings.marketplaceDomain;
                    // }
                }),
                takeWhile(() => this.countdown > 0),
                takeUntil(this._unsubscribeAll),
                tap(() => this.countdown--)
            )
            .subscribe();
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

    redirect()
    {
        switch (this.channel) {
            case 'DELIVERIN':
                this._document.location.href = 'https://' + this._apiServer.settings.marketplaceDomain;
                break;
                
            default:
                break;
        }
    }

}

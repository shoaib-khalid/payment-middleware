import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Subject, Subscription, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
    selector     : 'custom-1-layout',
    templateUrl  : './custom-1.component.html',
    encapsulation: ViewEncapsulation.None
})
export class Custom1LayoutComponent implements OnInit, OnDestroy
{
    // Get NgScrollbar reference
    @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;

    // Unsubscriber for elementScrolled stream.
    private _scrollSubscription = Subscription.EMPTY;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    isSticky = false;

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private ngZone: NgZone
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

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        this._scrollSubscription.unsubscribe();
    }

    /**
    * After view init
    */
    ngAfterViewInit(): void
    {

    }
}

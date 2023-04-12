import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';
import { DOCUMENT } from '@angular/common';
import { StoresService } from 'app/core/services/store.service';
import { Order } from 'app/core/services/types/order.types';
import { Store, StoreAsset } from 'app/core/services/types/store.types';

@Component({
    selector     : 'page-header',
    templateUrl  : './page-header.component.html',
    styles       : [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {

                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    store: Store = null;
    storeLogo: StoreAsset = null;
    order: Order = null;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        @Inject(DOCUMENT) private _document: Document,
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

        this._storesService.store$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((store: Store) => {
                if (store) {
                    this.store = store;
                    this.storeLogo = store.storeAssets.find(x => x.assetType === 'LogoUrl');
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._storesService.order$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((order: Order) => {
                if (order) {
                    this.order = order;
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

    /**
    * After view init
    */
    ngAfterViewInit(): void
    {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


}

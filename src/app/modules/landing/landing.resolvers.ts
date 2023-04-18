import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { PaymentService } from 'app/core/services/payment.service';
import { StoresService } from 'app/core/services/store.service';
import { Order } from 'app/core/services/types/order.types';
import { PaymentRequestBody } from 'app/core/services/types/payment.types';
import { Store } from 'app/core/services/types/store.types';
import { catchError, combineLatest, forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LandingDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _storesService: StoresService,
        private _router: Router,
        private _paymentService: PaymentService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        const storeId = route.queryParamMap.get('storeId');
        const orderId = route.queryParamMap.get('orderId');

        // Check if query params are provided
        if (!storeId || !orderId) {
            
            return of(false);
        }

        // combine to get the data
        return combineLatest([
            this._storesService.getStoreById(storeId),
            this._storesService.getOrderById(orderId)
        ])
        .pipe(
            map(([store, order] : [Store, Order] )=> {

				if (store && order) {
					const body: PaymentRequestBody = {
						browser	: 'MOBILE',
						channel	: 'DELIVERIN',
						orderId	: order.id,
						paymentAmount : order.total,
						paymentDescription : '',
						regionCountryId : store.regionCountry.id,
						storeId : store.id,
						storeName : store.name,
						storeVerticalCode : store.verticalCode
					}
					return body;
				}
				else return null;
				
			}),
			switchMap((body : PaymentRequestBody) => {

				return this._paymentService.requestMakePayment(body)
				
			}),
            catchError(() =>
            {
                this._router.navigate(['/error-500'])
                // Return false
                return of(false)
            })
        )
    }
}


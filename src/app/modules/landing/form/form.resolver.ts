import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaymentService } from "app/core/services/payment.service";
import { StoresService } from "app/core/services/store.service";
import { Observable, catchError, combineLatest, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FormResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _paymentService: PaymentService,
        private _router: Router
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
        const transactionId = route.paramMap.get('transactionId');        

        return this._paymentService.getPaymentDetails(transactionId)
                .pipe(
                    catchError(() =>
                    {
                        this._router.navigate(['/access-denied']);
                        // Return false
                        return of(false);
                    }),
                )
    }
}

@Injectable({
    providedIn: 'root'
})
export class BNPLResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _paymentService: PaymentService,
        private _router: Router
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
        const formType = route.paramMap.get('formType');   

        if (formType === 'card') return of([]);

        else if (formType === 'bnpl'){

            return this._paymentService.getBNPLList()
        }
             

    }
}

@Injectable({
    providedIn: 'root'
})
export class FormHeaderDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _storesService: StoresService,
        private _router: Router,
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
            catchError(() =>
            {
                this._router.navigate(['/error-500'])
                // Return false
                return of(false)
            })
        )
    }
}
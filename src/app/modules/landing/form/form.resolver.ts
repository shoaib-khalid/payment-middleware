import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaymentService } from "app/core/services/payment.service";
import { Observable, catchError, of } from "rxjs";

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
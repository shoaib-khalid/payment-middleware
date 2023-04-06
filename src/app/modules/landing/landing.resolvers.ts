import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { StoresService } from 'app/core/services/store.service';
import { catchError, forkJoin, Observable, of, switchMap } from 'rxjs';

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
        const storeId = route.queryParamMap.get('storeId');
        const orderId = route.queryParamMap.get('orderId');

        // Redirect to another route
        // this._router.navigate(['/']);

        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._storesService.getStoreById(storeId),
            this._storesService.getOrderById(orderId)
        ])
        .pipe(
            catchError(() =>
            {
                this._router.navigate(['/'])
                // Return false
                return of(false)
            }),
        )
    }
}

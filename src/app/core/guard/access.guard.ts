import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const queryParams = route.queryParams;

        // Check if query params are provided
        if (!queryParams['storeId'] || !queryParams['orderId']) {
            
            // Redirect to another route
            this._router.navigate(['/404-not-found']);
            return false;
        }

        return true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

}

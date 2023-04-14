import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccessFormGuard implements CanActivate
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
        const transactionId = route.paramMap.get('transactionId');
        const formType = route.paramMap.get('formType');

        // Check if query transactionId is provided, and formType is 'bnpl' or 'card'
        if (!transactionId || (formType !== 'bnpl' && formType !== 'card')) {
            
            // Redirect to 404
            this._router.navigate(['/404-not-found']);
            return false;
        }

        return true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

}

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Router } from '@angular/router';

@Injectable()
export class CoreInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
    )
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                if ( error instanceof HttpErrorResponse && !(error.status === 403)) {

                    this._router.navigate(['/error-500'])
                    
                }
                
                return throwError(error);
            })
        );
    }
}

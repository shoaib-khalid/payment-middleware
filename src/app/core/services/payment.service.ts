import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, switchMap } from 'rxjs';
import { AppConfig } from 'app/config/service.config';
import { LogService } from '../logging/log.service';
import { BetterPayment, PaymentRequestBody, PaymentRequestResp } from './types/payment.types';
import { Router } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class PaymentService {

	private _paymentDetail: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _paymentRequest: BehaviorSubject<PaymentRequestResp | null> = new BehaviorSubject(null);

  	constructor(
		private _httpClient: HttpClient,
        private _apiServer: AppConfig,
        private _logging: LogService,
        private _router: Router
	) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

	/** Getter for payment details */
    get paymentDetail$(): Observable<any> { return this._paymentDetail.asObservable(); }

    /** Getter for payment request */
    get paymentRequest$(): Observable<PaymentRequestResp> { return this._paymentRequest.asObservable(); }

	getPaymentDetails(invoiceId: string): Observable<any>
    {

        if (invoiceId === null) return of(null);
        
        let paymentService = this._apiServer.settings.apiServer.paymentService;
        let accessToken = "accessToken";

        const header = {
            headers: new HttpHeaders().set("Authorization", `Bearer ${accessToken}`),
        };
        
        return this._httpClient.get<any>(paymentService + '/payments/getPaymentDetails/' + invoiceId, header)
            .pipe(
                switchMap(async (response) => {
                    this._logging.debug("Response from StoresService (getPaymentDetails)", response);

                    this._paymentDetail.next(response["data"]);
                    return response["data"];
                })
            )
    }

	requestMakePayment(paymentBody: PaymentRequestBody): Observable<PaymentRequestResp>
    {
        
        let paymentService = this._apiServer.settings.apiServer.paymentService;
        let accessToken = "accessToken";

        const header = {
            headers: new HttpHeaders().set("Authorization", `Bearer ${accessToken}`),
        };
        
        return this._httpClient.post<any>(paymentService + '/payments/request/makePayment', paymentBody, header)
            .pipe(
                catchError(() =>
                    // Return null
                    this._router.navigate(['/404-not-found'])
                ),
                switchMap(async (response) => {
                    this._logging.debug("Response from StoresService (requestMakePayment)", response);

                    this._paymentRequest.next(response["data"]);
                    return response["data"];
                })
            )
    }

    postBetterPayment(paymentBody: BetterPayment): Observable<any>
    {
        
        let paymentService = this._apiServer.settings.apiServer.paymentService;
        let accessToken = "accessToken";

        const header = {
            headers: new HttpHeaders().set("Authorization", `Bearer ${accessToken}`),
        };
        
        return this._httpClient.post<any>(paymentService + '/payments/payment-request', paymentBody, header)
            .pipe(
                switchMap(async (response) => {
                    this._logging.debug("Response from StoresService (postBetterPayment)", response);

                    return response["data"];
                })
            )
    }
}

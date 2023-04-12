import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { AppConfig } from 'app/config/service.config';
import { LogService } from '../logging/log.service';
import { BetterPayment } from './types/payment.types';

@Injectable({
  	providedIn: 'root'
})
export class PaymentService {

	private _paymentDetail: BehaviorSubject<any | null> = new BehaviorSubject(null);

  	constructor(
		private _httpClient: HttpClient,
        private _apiServer: AppConfig,
        private _logging: LogService
	) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

	/** Getter for payment details */
    get paymentDetail$(): Observable<any> { return this._paymentDetail.asObservable(); }


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

	postBetterPayment(paymentBody: BetterPayment): Observable<BetterPayment>
    {
        
        let paymentService = this._apiServer.settings.apiServer.paymentService;
        let accessToken = "accessToken";

        const header = {
            headers: new HttpHeaders().set("Authorization", `Bearer ${accessToken}`),
        };
        
        return this._httpClient.post<BetterPayment>(paymentService + '/payments/payment-request', paymentBody, header)
        .pipe(
            switchMap(async (response) => {
                this._logging.debug("Response from StoresService (postBetterPayment)", response);

                return response["data"];
            })
        )
    }
}

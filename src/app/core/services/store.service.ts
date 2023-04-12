import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppConfig } from 'app/config/service.config';
import { LogService } from '../logging/log.service';
import { Order } from './types/order.types';
import { Store } from './types/store.types';

@Injectable({
    providedIn: 'root'
})
export class StoresService
{
    private _store: BehaviorSubject<Store | null> = new BehaviorSubject(null);
    private _order: BehaviorSubject<Order | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _apiServer: AppConfig,
        private _logging: LogService

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // ----------------------
    // Store
    //----------------------- 

    /** Getter for store */
    get store$(): Observable<Store> { return this._store.asObservable(); }
    /** Setter for store */
    set store(value: Store) { this._store.next(value); }

    /** Getter for order */
    get order$(): Observable<Order> { return this._order.asObservable(); }
    /** Setter for order */
    set order(value: Order) { this._order.next(value); }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // ---------------------------
    // Store Section
    // ---------------------------

    getStoreById(id: string): Observable<Store>
    {

        if (id === null) return of(null);
        
        let productService = this._apiServer.settings.apiServer.productService;
        let accessToken = "accessToken";

        const header = {
            headers: new HttpHeaders().set("Authorization", `Bearer ${accessToken}`),
        };
        
        return this._httpClient.get<Store>(productService + '/stores/' + id , header)
        .pipe(
            // catchError(() =>
            //     // Return false
            //     of(false)
            // ),
            switchMap(async (response) => {
                this._logging.debug("Response from StoresService (getStoreById)", response);

                this._store.next(response["data"]);
                return response["data"];
            })
        )
    }

    // ---------------------------
    // Order Section
    // ---------------------------

    getOrderById(id: string): Observable<Order>
    {
        if (id === null) return of(null);

        let orderService = this._apiServer.settings.apiServer.orderService;
        let accessToken = "accessToken";
        
        const header = {  
            headers: new HttpHeaders().set("Authorization", `Bearer ${accessToken}`)
        };

        return this._httpClient.get<Order>(orderService + '/orders/' + id, header)
            .pipe(
                // catchError(() =>
                //     // Return false
                //     of(false)
                // ),
                switchMap(async (response: any) => {
                    this._logging.debug("Response from StoresService (getOrderById)", response);

                    this._order.next(response["data"]);
                    return response["data"];
                })
            );
    }
}
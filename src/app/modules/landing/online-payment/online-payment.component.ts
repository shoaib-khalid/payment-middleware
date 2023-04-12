import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from 'app/config/service.config';

@Component({
    selector     : 'app-online-payment',
    templateUrl  : './online-payment.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OnlinePaymentComponent
{
    qrUrl = 'https://' + AppConfig.settings.paymentMiddleware + '/form';

    /**
     * Constructor
     */
    constructor()
    {
    }

    close() {
        window.close();
    }
    open() {
        window.open('http://localhost:4200/online-payment?storeId=02c268aa-0783-4836-a29f-6280dcb59938&orderId=e2c0e3ab-a90f-46eb-af54-ffad06bc00a8');
    }
}

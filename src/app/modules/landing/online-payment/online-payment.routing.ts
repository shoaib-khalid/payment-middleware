import { Route } from '@angular/router';
import { OnlinePaymentComponent } from './online-payment.component';
import { AccessGuard } from 'app/core/guard/access.guard';
import { OnlinePaymentResolver } from './online-payment.resolver';

export const onlinePaymentRoutes: Route[] = [
    {
        path     : '',
        // resolve  : {
        //     onlinePaymentResolver : OnlinePaymentResolver
        // },
        canActivate: [AccessGuard],
        component: OnlinePaymentComponent
    }
];

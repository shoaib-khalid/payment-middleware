import { Route } from '@angular/router';
import { OnlinePaymentComponent } from './online-payment.component';
import { AccessGuard } from 'app/core/guard/access.guard';

export const onlinePaymentRoutes: Route[] = [
    {
        path     : '',
        canActivate: [AccessGuard],
        component: OnlinePaymentComponent
    }
];

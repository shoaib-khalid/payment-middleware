import { Route } from '@angular/router';
import { ThankYouComponent } from 'app/modules/landing/thankyou/thankyou.component';

export const thankyouRoutes: Route[] = [
    {
        path     : ':status',
        data: {
            layout: 'empty'
        },
        component: ThankYouComponent
    }
];

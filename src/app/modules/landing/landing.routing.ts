import { Route } from '@angular/router';
import { LandingDataResolver } from './landing.resolvers';

export const landingRoutes: Route[] = [
    // Landing routes
    {
        path       : '',
        resolve: {
            landingDataResolver: LandingDataResolver
        },
        children   : [
            { path: 'online-payment', loadChildren: () => import('app/modules/landing/online-payment/online-payment.module').then(m => m.OnlinePaymentModule) },
            { path: 'pay-later', loadChildren: () => import('app/modules/landing/pay-later/pay-later.module').then(m => m.PayLaterModule) },
            { path: 'form', loadChildren: () => import('app/modules/landing/form/form.module').then(m => m.FormModule) },
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/landing/not-found/not-found.module').then(m => m.NotFoundModule) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];
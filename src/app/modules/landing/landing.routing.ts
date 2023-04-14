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
            { path: 'access-denied', pathMatch: 'full', loadChildren: () => import('app/modules/landing/access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/landing/not-found/not-found.module').then(m => m.NotFoundModule) },
            { path: 'error-500', pathMatch: 'full', loadChildren: () => import('app/modules/landing/error-500/error-500.module').then(m => m.Error500Module) },
            { path: 'thankyou', loadChildren: () => import('app/modules/landing/thankyou/thankyou.module').then(m => m.ThankYouModule) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];
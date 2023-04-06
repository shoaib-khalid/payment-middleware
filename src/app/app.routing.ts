import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'custom-1'
        },
        children: [
            { path: '', loadChildren: () => import('app/modules/landing/landing.module').then(m => m.LandingModule) }
        ]
    }
];

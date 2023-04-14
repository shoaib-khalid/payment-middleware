import { Route } from '@angular/router';
import { AccessDeniedComponent } from './access-denied.component';

export const accessDeniedRoutes: Route[] = [
    {
        path     : '',
        data: {
            layout: 'empty'
        },
        component: AccessDeniedComponent
    }
];

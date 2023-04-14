import { Route } from '@angular/router';
import { Error500Component } from './error-500.component';

export const error500Routes: Route[] = [
    {
        path     : '',
        data: {
            layout: 'empty'
        },
        component: Error500Component
    }
];

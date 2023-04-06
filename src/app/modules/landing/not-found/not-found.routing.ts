import { Route } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

export const notFoundRoutes: Route[] = [
    {
        path     : '',
        data: {
            layout: 'empty'
        },
        component: NotFoundComponent
    }
];

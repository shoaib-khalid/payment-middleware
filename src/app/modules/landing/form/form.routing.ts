import { Route } from '@angular/router';
import { AccessGuard } from 'app/core/guard/access.guard';
import { FormComponent } from './form.component';

export const formRoutes: Route[] = [
    {
        path     : '',
        data: {
            layout: 'empty'
        },
        // canActivate: [AccessGuard],
        component: FormComponent
    }
];

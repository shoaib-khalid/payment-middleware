import { Route } from '@angular/router';
import { AccessGuard } from 'app/core/guard/access.guard';
import { FormComponent } from './form.component';
import { AccessFormGuard } from 'app/core/guard/access-form.guard';
import { BNPLResolver, FormHeaderDataResolver, FormResolver } from './form.resolver';

export const formRoutes: Route[] = [
    {
        path     : '',
        data: {
            layout: 'empty'
        },
        canActivate : [AccessFormGuard],
        component: FormComponent
    },
    {
        path        : ':formType/:transactionId',
        data: {
            layout: 'empty'
        },
        component   : FormComponent,
        canActivate : [AccessFormGuard, AccessGuard],
        resolve     : {
            // FormHeaderDataResolver : FormHeaderDataResolver,
            // FormResolver : FormResolver,
            BNPLResolver : BNPLResolver
        }
    }
];

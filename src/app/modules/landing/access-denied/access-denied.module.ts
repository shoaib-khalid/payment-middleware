import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AccessDeniedComponent } from './access-denied.component';
import { accessDeniedRoutes } from './access-denied.routing';

@NgModule({
    declarations: [
        AccessDeniedComponent,
    ],
    imports     : [
        RouterModule.forChild(accessDeniedRoutes),
        SharedModule
    ]
})
export class AccessDeniedModule
{
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotFoundComponent } from './not-found.component';
import { notFoundRoutes } from './not-found.routing';

@NgModule({
    declarations: [
        NotFoundComponent,
    ],
    imports     : [
        RouterModule.forChild(notFoundRoutes),
        SharedModule
    ]
})
export class NotFoundModule
{
}

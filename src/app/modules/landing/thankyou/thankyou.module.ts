import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ThankYouComponent } from 'app/modules/landing/thankyou/thankyou.component';
import { thankyouRoutes } from 'app/modules/landing/thankyou/thankyou.routing';

@NgModule({
    declarations: [
        ThankYouComponent
    ],
    imports     : [
        RouterModule.forChild(thankyouRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class ThankYouModule
{
}

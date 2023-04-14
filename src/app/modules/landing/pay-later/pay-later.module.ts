import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { payLaterRoutes } from './pay-later.routing';
import { PayLaterComponent } from './pay-later.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
        PayLaterComponent
    ],
    imports     : [
        RouterModule.forChild(payLaterRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatTooltipModule,
        MatFormFieldModule
    ]
})
export class PayLaterModule
{
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { onlinePaymentRoutes } from './online-payment.routing';
import { OnlinePaymentComponent } from './online-payment.component';
import {MatCardModule} from '@angular/material/card';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [
        OnlinePaymentComponent
    ],
    imports     : [
        RouterModule.forChild(onlinePaymentRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatCardModule,
        QRCodeModule
    ]
})
export class OnlinePaymentModule
{
}

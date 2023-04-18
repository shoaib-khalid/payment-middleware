import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { formRoutes } from './form.routing';
import { FormComponent } from './form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BNPLComponent } from '../bnpl/bnpl.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [
        FormComponent,
        BNPLComponent
    ],
    imports     : [
        RouterModule.forChild(formRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        CreditCardDirectivesModule,
        MatTooltipModule,
        MatRadioModule
    ]
})
export class FormModule
{
}

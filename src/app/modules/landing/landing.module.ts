import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { landingRoutes } from 'app/modules/landing/landing.routing';

@NgModule({
    imports     : [
        RouterModule.forChild(landingRoutes),
    ]
})
export class LandingModule
{
}

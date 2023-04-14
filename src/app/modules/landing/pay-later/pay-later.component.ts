import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector     : 'app-pay-later',
    templateUrl  : './pay-later.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PayLaterComponent
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute

    )
    {
    }

    navigate() {
        this._router.navigate(['/pay-later-form'], {relativeTo: this._activatedRoute});
        // this._router.navigate(['./', newContact.id], {relativeTo: this._activatedRoute});
    }
}

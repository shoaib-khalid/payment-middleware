import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject } from 'rxjs';
import { AppConfig } from "app/config/service.config";

@Component({
    selector     : 'not-found',
    templateUrl  : './not-found.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent
{

    /**
     * Constructor
     */
    constructor()
    {
        
    }
}

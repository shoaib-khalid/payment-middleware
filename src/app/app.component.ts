import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map, tap } from 'rxjs';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    modalVersion: boolean = false;
    version: any = '';
    /**
     * Constructor
     */
    constructor(
        private _swUpdate: SwUpdate
    )
    {
        // reload if there is an update for PWA
        // this._swUpdate.versionUpdates.subscribe(event => {
        //     this._swUpdate.activateUpdate().then(()=> document.location.reload());
        // });

        // this._swUpdate.versionUpdates
        //     .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        //     .subscribe(evt => {
        //         // Reload the page to update to the latest version.
        //         document.location.reload();
        //     });

        if (this._swUpdate.isEnabled) {

            this._swUpdate.versionUpdates.pipe(
                filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
                map((evt: any) => {
                    console.info(`currentVersion=[${evt.currentVersion.appData.version} | latestVersion=[${evt.latestVersion.appData.version}]`);
                    this.modalVersion = true;
                }),
            ).subscribe();
        } 
    }

    /**
     * On init
     */
    ngOnInit(): void
    {

    }

    updateVersion(): void {
        this.modalVersion = false;
        window.location.reload();
    }
}

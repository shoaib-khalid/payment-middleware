import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PaymentService } from 'app/core/services/payment.service';
import { BNPLList } from 'app/core/services/types/payment.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'app-bnpl',
    templateUrl  : './bnpl.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BNPLComponent implements OnInit, OnDestroy
{
    @Output() dataFromBNPLTemplate = new EventEmitter();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    provider: BNPLList | string = null;
    bnplList: BNPLList[] = [];

    /**
     * Constructor
     */
    constructor(
        private _paymentService: PaymentService,
        private _changeDetectorRef: ChangeDetectorRef

    )
    {
    }
    ngOnInit(): void {

        this._paymentService.bnplList$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bnplList: BNPLList[]) => {
                if (bnplList) {
                    this.bnplList = bnplList;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    

    }

    ngOnDestroy(): void {
    }

    confirm() {
        this.dataFromBNPLTemplate.emit(this.provider);
    }

    selectProvider() {
        // this.dataFromBNPLTemplate.emit(this.provider);
    }
}

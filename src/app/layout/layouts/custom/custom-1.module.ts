import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from 'app/layout/common/page-header/page-header.module';
import { Custom1LayoutComponent } from './custom-1.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
    declarations: [
        Custom1LayoutComponent
    ],
    imports     : [
        RouterModule,
        FuseLoadingBarModule,
        SharedModule,
        PageHeaderModule,
        NgScrollbarModule
    ],
    exports     : [
        Custom1LayoutComponent
    ]
})
export class Custom1LayoutModule
{
}

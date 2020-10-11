import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingMethodListComponent} from './shipping-method-list/shipping-method-list.component';
import {RouterModule, Routes} from "@angular/router";
import {FuseSharedModule} from "../../../../../@fuse/shared.module";

const routes: Routes = [
    {
        path: 'list',
        component: ShippingMethodListComponent
    },
    {
        path: 'edit/:id',
        component: ShippingMethodListComponent
    },
    {
        path: 'create',
        component: ShippingMethodListComponent
    },
    {
        path: '**',
        redirectTo: 'list'
    }
];
@NgModule({
    declarations: [ShippingMethodListComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FuseSharedModule
    ]
})
export class ShippingMethodModule {
}

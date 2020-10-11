import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from "../../../../@fuse/shared.module";

const routes = [
    {
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
    },
    {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule'
    },
    {
        path: 'shipping-method',
        loadChildren: './shipping-method/shipping-method.module#ShippingMethodModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
})


export class ProductsModule {
}

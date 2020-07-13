import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routes = [
    {
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})


export class ProductsModule {
}

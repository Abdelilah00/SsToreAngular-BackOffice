import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';

import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {ProductCreateComponent} from './product-create/product.component';
import {ProductUpdateComponent} from './product-update/product.component';

const routes: Routes = [
    {
        path: 'list',
        component: ProductListComponent
    },
    {
        path: 'edit/:id',
        component: ProductUpdateComponent
    },
    {
        path: 'create',
        component: ProductCreateComponent
    },
    {
        path: '**',
        redirectTo: 'list'
    }
];

@NgModule({

    declarations: ProductModule.COMPONENT_LIST,
    exports: ProductModule.COMPONENT_LIST,
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class ProductModule {
    static readonly COMPONENT_LIST = [ProductListComponent, ProductCreateComponent, ProductUpdateComponent];
}

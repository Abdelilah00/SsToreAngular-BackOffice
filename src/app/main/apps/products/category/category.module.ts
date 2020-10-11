import {NgModule} from '@angular/core';
import {CategoryListComponent} from './category-list/category-list.component';
import {RouterModule, Routes} from "@angular/router";
import {BodyModule, SharedModule} from "@progress/kendo-angular-grid";
import {FuseSharedModule} from "../../../../../@fuse/shared.module";
import {DialogModule} from "@progress/kendo-angular-dialog";
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryEditChildComponent} from './category-edit-child/category-edit-child.component';

const routes: Routes = [
    {
        path: 'list',
        component: CategoryListComponent
    },
    {
        path: 'edit/:id',
        component: CategoryListComponent
    },
    {
        path: 'create',
        component: CategoryListComponent
    },
    {
        path: '**',
        redirectTo: 'list'
    }
];

@NgModule({
    declarations: [CategoryModule.COMPONENT_LIST, CategoryEditChildComponent],
    exports: [CategoryModule.COMPONENT_LIST],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        SharedModule,
        BodyModule,
        DialogModule,
    ]
})
export class CategoryModule {
    static readonly COMPONENT_LIST = [
        CategoryListComponent, CategoryEditComponent, CategoryDetailsComponent
    ];
}

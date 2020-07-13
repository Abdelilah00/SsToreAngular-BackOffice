import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routes = [
    {
        path: 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path: 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },

    {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ]
})
export class AppsModule {
}

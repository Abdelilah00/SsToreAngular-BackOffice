import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ProductService} from '../../../../shared/services/product/product.service';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
    gridData: any[];
    displayedColumns = ['id', 'image', 'name', 'category', 'price', 'stockQte', 'initQte', 'active'];

    constructor(
        private productService: ProductService
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.productService.getAll().subscribe(data => this.gridData = data);
    }
}

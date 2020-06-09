import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';

import {EcommerceProductService} from 'app/main/apps/e-commerce/product-create/product.service';
import {Product} from '../../../shared/models/product.model';

@Component({
    selector: 'e-commerce-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductUpdateComponent implements OnInit {
    product: Product;
    productForm: FormGroup;



    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceProductService: EcommerceProductService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        this.product = new Product();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.product.id],
            name: [this.product.name],
            comment: [this.product.comment],
            categories: [this.product.categoriesId],
            tags: [this.product.tagsId],
            images: [this.product.images],


        });
    }

    /**
     * Save product
     */
    saveProduct(): void {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceProductService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }

    /**
     * Add product
     */
    addProduct(): void {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceProductService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product added', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }
}

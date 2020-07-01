import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

import {fuseAnimations} from '@fuse/animations';
import {ProductService} from '../../../shared/services/product/product.service';
import {finalize, map, startWith} from 'rxjs/operators';
import {TagService} from '../../../shared/services/tag/tag.service';
import {CategoryService} from '../../../shared/services/category/category.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {WareHouseService} from '../../../shared/services/ware-house/ware-house.service';
import {Category} from '../../../shared/models/category.model';
import {Tag} from '../../../shared/models/tag.model';
import {WareHouse} from '../../../shared/models/ware-house.model';
import {Product} from '../../../shared/models/product.model';

@Component({
    selector: 'e-commerce-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductCreateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('categoryInput', {static: false}) categoryInput: ElementRef<HTMLInputElement>;
    @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('wareHouseInput', {static: false}) wareHouseInput: ElementRef<HTMLInputElement>;
    @ViewChild('autoCategory', {static: false}) matAutocompleteCategory: MatAutocomplete;
    @ViewChild('autoTag', {static: false}) matAutocompleteTag: MatAutocomplete;
    @ViewChild('autoWareHouse', {static: false}) matAutocompleteWareHouse: MatAutocomplete;


    saving = false;
    formGroup = this.createProductFormGroup();
    formData = new FormData();

    filtredCategories: Observable<Category[]>;
    selectedCategories = new Array<Category>();
    allCategories = new Array<Category>();

    filtredTags: Observable<Tag[]>;
    selectedTags = new Array<Tag>();
    allTags = new Array<Tag>();

    filtredWareHouses: Observable<WareHouse[]>;
    selectedWareHouses = new Array<WareHouse>();
    allWareHouses = new Array<WareHouse>();

    /**
     * Constructor
     *
     * @param {ProductService} _service
     * @param {CategoryService} _categoryService
     * @param {TagService} _tagService
     * @param {WareHouseService} _wareHouseService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _service: ProductService,
        private _categoryService: CategoryService,
        private _tagService: TagService,
        private _wareHouseService: WareHouseService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar) {
    }

    findWithAttr(array, attr, value): number {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    /*** categories multiSelect with filter*/
    removeCat(cat: string): void {
        const index = this.findWithAttr(this.selectedCategories, 'name', cat);
        if (index >= 0) {
            this.selectedCategories.splice(index, 1);
        }
    }

    selectedCat(event: MatAutocompleteSelectedEvent): void {
        const category = new Category();
        category.id = event.option.value;
        category.name = event.option.viewValue;
        this.selectedCategories.push(category);
        this.categoryInput.nativeElement.value = '';
        this.formGroup.controls['categoriesId'].setValue(null);
    }

    /*** tags multiSelect with filter*/
    removeTag(tag: string): void {
        const index = this.findWithAttr(this.selectedTags, 'name', tag);

        if (index >= 0) {
            this.selectedTags.splice(index, 1);
        }
    }

    selectedTag(event: MatAutocompleteSelectedEvent): void {
        const tag = new Tag();
        tag.id = event.option.value;
        tag.name = event.option.viewValue;
        this.selectedTags.push(tag);
        this.tagInput.nativeElement.value = '';
        this.formGroup.controls['tagsId'].setValue(null);
    }

    /*** WareHouse multiSelect with filter*/
    removeWareHouse(wHouse: string): void {
        const index = this.findWithAttr(this.selectedWareHouses, 'country', wHouse);
        if (index >= 0) {
            this.selectedWareHouses.splice(index, 1);
        }
    }

    selectedWareHouse(event: MatAutocompleteSelectedEvent): void {
        const wHouse = new WareHouse();
        wHouse.id = event.option.value;
        wHouse.country = event.option.viewValue;
        this.selectedWareHouses.push(wHouse);
        this.tagInput.nativeElement.value = '';
        this.formGroup.controls['wareHousesId'].setValue(null);
    }

    /**
     * On init
     */

    ngOnInit(): void {
        this._categoryService.getAll().subscribe(data => {
            this.allCategories = data;
            this.filtredCategories = this.formGroup.controls['categoriesId'].valueChanges.pipe(
                startWith(null),
                map((cat: string | null) => cat ? this._filterCategory(cat) : this.allCategories.slice()));
        });

        this._tagService.getAll().subscribe(data => {
            this.allTags = data;
            this.filtredTags = this.formGroup.controls['tagsId'].valueChanges.pipe(
                startWith(null),
                map((tag: string | null) => tag ? this._filterTag(tag) : this.allTags.slice()));
        });

        this._wareHouseService.getAll().subscribe(data => {
            this.allWareHouses = data;
            this.filtredWareHouses = this.formGroup.controls['wareHousesId'].valueChanges.pipe(
                startWith(null),
                map((wareHouse: string | null) => wareHouse ? this._filterWareHouse(wareHouse) : this.allWareHouses.slice()));
        });
    }

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: ['test', Validators.required],
            comment: ['test', Validators.required],
            price: ['10', Validators.nullValidator],
            qte: ['1000', Validators.nullValidator],
            overview: ['test', Validators.nullValidator],

            tagsId: ['', Validators.nullValidator],
            categoriesId: ['', Validators.nullValidator],
            wareHousesId: ['', Validators.nullValidator],
            shippingMethodsId: ['', Validators.nullValidator],

            images: [null, Validators.nullValidator],
            specifications: ['', Validators.nullValidator],
            characteristics: ['', Validators.nullValidator],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save product
     */

    uploadFile(event): void {
        if (event.target.files.length > 0) {
            // TODO: add multi select  and images previewers
            const file = event.target.files[0] as File;
            this.formData.append('images', file, file.name);
            this.formGroup.controls['images'].setValue(null);
        }
    }

    saveProduct(): void {
        this.formGroup.controls['categoriesId'].setValue(this.selectedCategories.map(data => data.id));
        this.formGroup.controls['tagsId'].setValue(this.selectedTags.map(data => data.id));
        this.formGroup.controls['wareHousesId'].setValue(this.selectedWareHouses.map(data => data.id));

        // TODO: Add this fields to Form
        this.formGroup.controls['shippingMethodsId'].setValue([1]);
        this.formGroup.controls['specifications'].setValue([{name: 'string', value: 1}]);
        this.formGroup.controls['characteristics'].setValue([{name: 'string', values: [1, 2]}]);

        this.formData.append('product', JSON.stringify(this.formGroup.value as Product));

        this.saving = true;
        this._service
            .createWithImages(this.formData)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this.goBack();
            }, (error) => {
                this._matSnackBar.open('Product Not saved', 'Try', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    goBack(): void {
        this._location.back();
    }

    private _filterCategory(value: string): Category[] {
        const filterValue = value.toString().toLowerCase();
        return this.allCategories.filter(cat => cat.name.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterTag(value: string): Tag[] {
        const filterValue = value.toString().toLowerCase();
        return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterWareHouse(value: string): WareHouse[] {
        const filterValue = value.toString().toLowerCase();
        return this.allWareHouses.filter(wareHouse => wareHouse.country.toLowerCase().indexOf(filterValue) === 0);
    }
}

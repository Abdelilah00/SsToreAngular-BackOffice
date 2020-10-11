import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

import {fuseAnimations} from '@fuse/animations';
import {ProductService} from '../../../../shared/services/product/product.service';
import {finalize, map, startWith} from 'rxjs/operators';
import {TagService} from '../../../../shared/services/tag/tag.service';
import {CategoryService} from '../../../../shared/services/category/category.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {WareHouseService} from '../../../../shared/services/ware-house/ware-house.service';
import {Category} from '../../../../shared/models/category.model';
import {Tag} from '../../../../shared/models/tag.model';
import {WareHouse} from '../../../../shared/models/ware-house.model';
import {Product} from '../../../../shared/models/product.model';


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
    productFormGroup = this.createProductFormGroup();
    productFormData = new FormData();

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

    get formArrayCharacteristics(): FormArray {
        return this.productFormGroup.controls.characteristics as FormArray;
    }


    addChar(): void {
        this.formArrayCharacteristics.push(this.createFromGroupCharacteristic());
    }

    // TODO: add index to child component instead of use name
    removeChar(name): void {
        let index = this.formArrayCharacteristics.value.findIndex(item => item.name === name);
        index = index !== -1 ? index : this.formArrayCharacteristics.value.findIndex(item => item.name === null);

        this.formArrayCharacteristics.removeAt(index);
        console.log(this.formArrayCharacteristics.value);
    }

    // TODO: add index to child component instead of use name
    setNewChars(chars): void {
        console.log(chars);
        let index = this.formArrayCharacteristics.value.findIndex(item => item.name === null);
        index = index !== -1 ? index : this.formArrayCharacteristics.value.findIndex(item => item.name === chars.name);

        if (index !== -1) {
            this.formArrayCharacteristics.at(index).setValue(chars);
        }

        console.log(this.formArrayCharacteristics.value);
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
            this.updateFormGroup();
        }
    }

    selectedCat(event: MatAutocompleteSelectedEvent): void {
        const category = new Category();
        category.id = event.option.value;
        category.name = event.option.viewValue;
        this.selectedCategories.push(category);
        this.categoryInput.nativeElement.value = '';
        this.updateFormGroup();

    }

    /*** tags multiSelect with filter*/
    removeTag(tag: string): void {
        const index = this.findWithAttr(this.selectedTags, 'name', tag);

        if (index >= 0) {
            this.selectedTags.splice(index, 1);
            this.updateFormGroup();
        }
    }

    selectedTag(event: MatAutocompleteSelectedEvent): void {
        const tag = new Tag();
        tag.id = event.option.value;
        tag.tagName = event.option.viewValue;
        this.selectedTags.push(tag);
        this.tagInput.nativeElement.value = '';
        this.updateFormGroup();
    }

    /*** WareHouse multiSelect with filter*/
    removeWareHouse(wHouse: string): void {
        const index = this.findWithAttr(this.selectedWareHouses, 'country', wHouse);
        if (index >= 0) {
            this.selectedWareHouses.splice(index, 1);
            this.updateFormGroup();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    selectedWareHouse(event: MatAutocompleteSelectedEvent): void {
        const wHouse = new WareHouse();
        wHouse.id = event.option.value;
        wHouse.country = event.option.viewValue;
        this.selectedWareHouses.push(wHouse);
        this.tagInput.nativeElement.value = '';
        this.updateFormGroup();
    }

    /**
     * On init
     */

    ngOnInit(): void {


        this._categoryService.getAll().subscribe(data => {
            this.allCategories = data;
            this.filtredCategories = this.productFormGroup.controls['categoriesId'].valueChanges.pipe(
                startWith(null),
                map((cat: string | null) => cat ? this._filterCategory(cat) : this.allCategories.slice()));
        });

        this._tagService.getAll().subscribe(data => {
            this.allTags = data;
            this.filtredTags = this.productFormGroup.controls['tagsId'].valueChanges.pipe(
                startWith(null),
                map((tag: string | null) => tag ? this._filterTag(tag) : this.allTags.slice()));
        });

        this._wareHouseService.getAll().subscribe(data => {
            this.allWareHouses = data;
            this.filtredWareHouses = this.productFormGroup.controls['wareHousesId'].valueChanges.pipe(
                startWith(null),
                map((wareHouse: string | null) => wareHouse ? this._filterWareHouse(wareHouse) : this.allWareHouses.slice()));
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: ['test', Validators.required],
            comment: ['test', Validators.required],
            salePrice: ['10', Validators.required],
            initQte: ['1000', Validators.required],
            overview: ['test', Validators.required],

            tagsId: ['', Validators.required],
            categoriesId: ['', Validators.required],
            wareHousesId: ['', Validators.required],

            //images: [null, Validators.required],

            specifications: ['', Validators.required],
            shippedBy: ['', Validators.required],
            characteristics: this._formBuilder.array([]),
        });
    }

    /**
     * Save product
     */

    uploadFile(event): void {
        if (event.target.files.length > 0) {
            // TODO: add multi select  and images previewers
            const file = event.target.files[0] as File;
            this.productFormData.append('images', file, file.name);
            //this.productFormGroup.controls['images'].setValue(null);
        }
    }

    saveProduct(): void {
        // Dont touch this

        // TODO: Add this fields to HTML using a table Details
        // this.productFormGroup.controls['shippedBy'].setValue([1]);
        // tronsform formArray to Simple Array
        /*const tmp = this.formArrayCharacteristics.value.map(val => {
            return {name: val.name, values: val.values.map(v => v.value)};
        });
        this.productFormGroup.controls['characteristics'].setValue(tmp);*/

        this.productFormData.delete('product');
        this.productFormData.append('product', JSON.stringify(this.productFormGroup.value as Product));

        this.saving = true;

        this._service
            .createWithImages(this.productFormData)
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

    // kendo
    setSpecifications(specs): void {
        this.productFormGroup.controls['specifications'].setValue(specs);
    }

    setShippedBy(ship): void {
        this.productFormGroup.controls['shippedBy'].setValue(ship);
    }

    createFromGroupCharacteristic(chars: any = {}): FormGroup {
        return this._formBuilder.group({
            name: [chars.name, Validators.required],
            values: [chars.values, Validators.required]
        });
    }

    createFromGroupSpecification(chars: any = {}): FormGroup {
        return this._formBuilder.group({
            name: [chars.name, Validators.required],
            value: [chars.value, Validators.required],
        });
    }

    createFromGroupShippedBy(chars: any = {}): FormGroup {
        return this._formBuilder.group({
            amount: [chars.name, Validators.required],
            shippingCountryId: [chars.values, Validators.required],
            shippingMethodId: [chars.values, Validators.required],
        });
    }

    // Kendo
    goBack(): void {
        this._location.back();
    }

    private updateFormGroup(): void {
        this.productFormGroup.controls['categoriesId'].setValue(this.selectedCategories.map(data => data.id));
        this.productFormGroup.controls['tagsId'].setValue(this.selectedTags.map(data => data.id));
        this.productFormGroup.controls['wareHousesId'].setValue(this.selectedWareHouses.map(data => data.id));
    }

    private _filterCategory(value: string): Category[] {
        const filterValue = value.toString().toLowerCase();
        return this.allCategories.filter(cat => cat.name.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterTag(value: string): Tag[] {
        const filterValue = value.toString().toLowerCase();
        return this.allTags.filter(tag => tag.tagName.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterWareHouse(value: string): WareHouse[] {
        const filterValue = value.toString().toLowerCase();
        return this.allWareHouses.filter(wareHouse => wareHouse.country.toLowerCase().indexOf(filterValue) === 0);
    }
}

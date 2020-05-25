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
import {MatChipInputEvent} from '@angular/material/chips';

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
    @ViewChild('autoCategory', {static: false}) matAutocompleteCategory: MatAutocomplete;
    @ViewChild('autoTag', {static: false}) matAutocompleteTag: MatAutocomplete;


    saving = false;
    formGroup = this.createProductFormGroup();

    filtredCategories: Observable<string[]>;
    selectedCategories = new Array<string>();
    allCategories = new Array<string>();

    filtredTags: Observable<string[]>;
    selectedTags = new Array<string>();
    allTags = new Array<string>();

    /**
     * Constructor
     *
     * @param {ProductService} _service
     * @param {CategoryService} _categoryService
     * @param {TagService} _tagService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _service: ProductService,
        private _categoryService: CategoryService,
        private _tagService: TagService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar) {
    }

    /*** categories multiSelect with filter*/
    addCat(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our Cat
        if ((value || '').trim()) {
            this.selectedCategories.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.formGroup.controls['categories'].setValue(null);
    }

    removeCat(cat: string): void {
        const index = this.selectedCategories.indexOf(cat);

        if (index >= 0) {
            this.selectedCategories.splice(index, 1);
        }
    }

    selectedCat(event: MatAutocompleteSelectedEvent): void {
        this.selectedCategories.push(event.option.viewValue);
        this.categoryInput.nativeElement.value = '';
        this.formGroup.controls['categories'].setValue(null);
    }

    /*** tags multiSelect with filter*/
    addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our Cat
        if ((value || '').trim()) {
            this.selectedTags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.formGroup.controls['tags'].setValue(null);
    }

    removeTag(cat: string): void {
        const index = this.selectedTags.indexOf(cat);

        if (index >= 0) {
            this.selectedTags.splice(index, 1);
        }
    }

    selectedTag(event: MatAutocompleteSelectedEvent): void {
        this.selectedTags.push(event.option.viewValue);
        this.tagInput.nativeElement.value = '';
        this.formGroup.controls['tags'].setValue(null);
    }

    /**
     * On init
     */

    ngOnInit(): void {
        this._categoryService.getAll().subscribe(data => {
            this.allCategories = data.map(d => d.name);
            this.filtredCategories = this.formGroup.controls['categories'].valueChanges.pipe(
                startWith(null),
                map((cat: string | null) => cat ? this._filterCategory(cat) : this.allCategories.slice()));
        });

        this._tagService.getAll().subscribe(data => {
            this.allTags = data.map(d => d.name);
            this.filtredTags = this.formGroup.controls['tags'].valueChanges.pipe(
                startWith(null),
                map((tag: string | null) => tag ? this._filterTag(tag) : this.allTags.slice()));
        });
    }

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            qte: ['', Validators.required],
            images: ['', Validators.required],
            overviewDiscription: ['', Validators.required],
            specifications: ['', Validators.required],
            tags: ['', Validators.required],
            categories: ['', Validators.required],
            characteristic: ['', Validators.required],
            wareHouse: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save product
     */
    saveProduct(): void {
        this.saving = true;
        this._service
            .create(this.formGroup.value)
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

    private _filterCategory(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allCategories.filter(cat => cat.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterTag(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
    }
}

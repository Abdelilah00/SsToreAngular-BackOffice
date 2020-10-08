import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GridComponent} from "@progress/kendo-angular-grid";

@Component({
    selector: 'app-specifications-grid',
    templateUrl: './specifications-grid.component.html',
    styleUrls: ['./specifications-grid.component.scss']
})
export class SpecificationsGridComponent implements OnInit {
    specifications = [];
    @Output() specificationsChange = new EventEmitter<any>();
    specificationsForm: FormGroup;
    @ViewChild('grid', {static: true}) grid: GridComponent;

    constructor(private formBuilder: FormBuilder) {
    }

    // convenience getters for easy access to form fields

    get formArray(): FormArray {
        return this.specificationsForm.controls.formArray as FormArray;
    }

    ngOnInit(): void {
        // initialise products form with empty form array
        this.specificationsForm = this.formBuilder.group({
            formArray: new FormArray([])
        });

    }


    onAdd(): void {
        // add item to products array
        this.specifications.push({});

        // add new form group to form array
        const formGroup = this.createFormGroup();
        this.formArray.push(formGroup);

        // set new row to edit mode in kendo grid
        this.grid.editRow(this.specifications.length - 1, formGroup);
    }

    onRemove(index): void {
        // rows must all be closed while removing products
        this.closeAllRows();

        // remove product and product form group
        this.specifications.splice(index, 1);
        this.formArray.removeAt(index);

        // reset all rows back to edit mode
        this.editAllRows();
    }

    public onGridChange(): void {
        this.specifications = this.formArray.value;
        this.specificationsChange.emit(this.specifications);
    }

    private editAllRows(): void {
        // set all rows to edit mode to display form fields
        this.specifications.forEach((x, i) => {
            // @ts-ignore
            this.grid.editRow(i, this.formArray.controls[i]);
        });

    }

    private closeAllRows(): void {
        // close all rows to display readonly view of data
        this.specifications.forEach((x, i) => {
            this.grid.closeRow(i);
        });
    }

    private createFormGroup(product: any = {}): FormGroup {
        // create a new form group containing controls and validators for a product
        return this.formBuilder.group({
            name: [product.name, Validators.required],
            value: [product.value, Validators.required],
        });
    }
}

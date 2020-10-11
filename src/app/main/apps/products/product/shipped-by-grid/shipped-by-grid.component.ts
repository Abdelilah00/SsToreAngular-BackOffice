import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GridComponent} from "@progress/kendo-angular-grid";

@Component({
    selector: 'app-shipped-by-grid',
    templateUrl: './shipped-by-grid.component.html',
    styleUrls: ['./shipped-by-grid.component.scss']
})
export class ShippedByGridComponent implements OnInit {

    shippedBy = [];
    @Output() shippedByChange = new EventEmitter<any>();
    ShippedByForm: FormGroup;
    @ViewChild('grid', {static: true}) grid: GridComponent;

    constructor(private formBuilder: FormBuilder) {
    }

    // convenience getters for easy access to form fields
    get formArray(): FormArray {
        return this.ShippedByForm.controls.formArray as FormArray;
    }

    ngOnInit(): void {
        // initialise products form with empty form array
        this.ShippedByForm = this.formBuilder.group({
            formArray: new FormArray([])
        });
    }


    onAdd(): void {
        // add item to products array
        this.shippedBy.push({});

        // add new form group to form array
        const formGroup = this.createFormGroup();
        this.formArray.push(formGroup);

        // set new row to edit mode in kendo grid
        this.grid.editRow(this.shippedBy.length - 1, formGroup);
    }

    onRemove(index): void {
        // rows must all be closed while removing products
        this.closeAllRows();

        // remove product and product form group
        this.shippedBy.splice(index, 1);
        this.formArray.removeAt(index);

        // reset all rows back to edit mode
        //this.editAllRows();
        this.onGridChange();

    }

    public onGridChange(): void {
        //this.closeAllRows();
        this.shippedBy = this.formArray.value;
        this.shippedByChange.emit(this.shippedBy);
    }

    private editAllRows(): void {
        // set all rows to edit mode to display form fields
        this.shippedBy.forEach((x, i) => {
            // @ts-ignore
            this.grid.editRow(i, this.fa.controls[i]);
        });

    }

    private closeAllRows(): void {
        // close all rows to display readonly view of data
        this.shippedBy.forEach((x, i) => {
            this.grid.closeRow(i);
        });
    }

    private createFormGroup(product: any = {}): FormGroup {
        // create a new form group containing controls and validators for a product
        return this.formBuilder.group({
            amount: [product.amount, Validators.required],
            shippingCountryId: [product.shippingCountryId, Validators.required],
            shippingMethodId: [product.shippingMethodId, Validators.required],
        });
    }
}

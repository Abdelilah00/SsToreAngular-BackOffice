import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GridComponent} from "@progress/kendo-angular-grid";

@Component({
    selector: 'app-characteristics-details-grid',
    templateUrl: './characteristics-details-grid.component.html',
    styleUrls: ['./characteristics-details-grid.component.scss']
})
export class CharacteristicsDetailsGridComponent implements OnInit {
    @Input() public characteristicName: Object;
    characteristicsDetails = [];
    @Output() characteristicsDetailsChange = new EventEmitter<any>();
    characteristicsDetailsForm: FormGroup;
    @ViewChild('gridCharacteristicsDetails', {static: false}) grid: GridComponent;

    constructor(private formBuilder: FormBuilder) {
    }

    // convenience getters for easy access to form fields
    get formArray(): FormArray {
        return this.characteristicsDetailsForm.controls.formArray as FormArray;
    }


    ngOnInit(): void {
        // initialise products form with empty form array
        this.characteristicsDetailsForm = this.formBuilder.group({
            formArray: new FormArray([])
        });
    }

    onAdd(): void {
        // add item to products array
        this.characteristicsDetails.push({});

        // add new form group to form array
        const formGroup = this.createFormGroup();
        this.formArray.push(formGroup);

        // set new row to edit mode in kendo grid
        this.grid.editRow(this.characteristicsDetails.length - 1, formGroup);
    }

    onRemove(index): void {
        // rows must all be closed while removing products
        this.closeAllRows();

        // remove product and product form group
        this.characteristicsDetails.splice(index, 1);
        this.formArray.removeAt(index);

        // reset all rows back to edit mode
        this.editAllRows();
    }

    // helper methods

    public onGridChange(): void {
        //this.characteristicsDetails = this.formArray.value;
        //this.characteristicsDetailsChange.emit(this.characteristicsDetails);
        console.table(this.formArray.value);
    }

    private editAllRows(): void {
        // set all rows to edit mode to display form fields
        this.characteristicsDetails.forEach((x, i) => {
            // @ts-ignore
            this.grid.editRow(i, this.formArray.controls[i]);
        });
    }

    private closeAllRows(): void {
        // close all rows to display readonly view of data
        this.characteristicsDetails.forEach((x, i) => {
            this.grid.closeRow(i);
        });
    }


    private createFormGroup(product: any = {}): FormGroup {
        // create a new form group containing controls and validators for a product
        return this.formBuilder.group({
            value: [product.value, Validators.required],
        });
    }

}

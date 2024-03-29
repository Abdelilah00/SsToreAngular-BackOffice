import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GridComponent} from "@progress/kendo-angular-grid";

@Component({
    selector: 'app-characteristics-grid',
    templateUrl: './characteristics-grid.component.html',
    styleUrls: ['./characteristics-grid.component.scss']
})
export class CharacteristicsGridComponent implements OnInit {

    characteristics = [];
    @Output() characteristicsChange = new EventEmitter<any>();
    @Output() removeCharacteristicsChange = new EventEmitter<any>();
    characteristicsForm: FormGroup;
    @ViewChild('gridCharacteristics', {static: true}) grid: GridComponent;
    @ViewChild('inputElement', {static: true}) input: ElementRef<HTMLInputElement>;

    constructor(private formBuilder: FormBuilder) {
    }

    // convenience getters for easy access to form fields
    get formArray(): FormArray {
        return this.characteristicsForm.controls.formArray as FormArray;
    }


    ngOnInit(): void {
        // initialise products form with empty form array
        this.characteristicsForm = this.formBuilder.group({
            formArray: new FormArray([])
        });
    }

    onAdd(): void {
        // add item to products array
        this.characteristics.push({});

        // add new form group to form array
        const formGroup = this.createFormGroup();
        this.formArray.push(formGroup);

        // set new row to edit mode in kendo grid
        this.grid.editRow(this.characteristics.length - 1, formGroup);
    }

    onRemove(index): void {
        // rows must all be closed while removing products
        //this.closeAllRows();

        // remove product and product form group
        this.characteristics.splice(index, 1);
        this.formArray.removeAt(index);

        // reset all rows back to edit mode
        //this.editAllRows();
        this.onGridChange();
    }

    public onGridChange(): void {
        this.closeAllRows();
        this.characteristics = this.formArray.value;
        const tmp = {name: this.input.nativeElement.value, values: this.formArray.value.map(vl => vl.value)};
        this.characteristicsChange.emit(tmp);
    }

    // helper methods

    remove(): void {
        this.removeCharacteristicsChange.emit(this.input.nativeElement.value);
    }

    private setDetails(charsDetails): void {
        this.characteristics.find(elem => elem.name === charsDetails.name).value = charsDetails.values;
    }

    private editAllRows(): void {
        // set all rows to edit mode to display form fields
        this.characteristics.forEach((x, i) => {
            // @ts-ignore
            this.grid.editRow(i, this.fa.controls[i]);
        });
    }

    private closeAllRows(): void {
        // close all rows to display readonly view of data
        this.characteristics.forEach((x, i) => {
            this.grid.closeRow(i);
        });
    }

    private createFormGroup(product: any = {}): FormGroup {
        // create a new form group containing controls and validators for a product
        return this.formBuilder.group({
            value: ['', Validators.required]
        });
    }
}

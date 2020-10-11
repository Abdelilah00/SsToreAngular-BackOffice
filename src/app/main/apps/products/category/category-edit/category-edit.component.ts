import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../shared/models/category.model";

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

    gridData: any[];
    displayedColumns = ['name'];
    public active = false;
    public editForm: FormGroup = new FormGroup({
        id: new FormControl(),
        name: new FormControl('', Validators.required),
        parentId: new FormControl(),
    });

    @Input() public isNew = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    @Input()
    public set model(category: Category) {
        this.editForm.reset(category);
        this.active = category !== undefined;
    }

    ngOnInit(): void {
    }

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }
}

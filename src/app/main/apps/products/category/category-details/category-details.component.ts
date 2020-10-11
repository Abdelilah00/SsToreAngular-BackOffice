import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../../shared/models/category.model";
import {CategoryService} from "../../../../shared/services/category/category.service";
import {finalize} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
    view: Category[];
    @Input() category: Category;
    public editDataItem: Category;
    public isNew: boolean;


    constructor(private categoryService: CategoryService,
                private _matSnackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.categoryService.getChildren(this.category.id).subscribe(data => this.view = data);
    }

    public addHandler(): void {
        const tmp = new Category();
        tmp.parentId = this.category.id;
        this.editDataItem = tmp;
        this.isNew = true;
    }

    public editHandler({dataItem}): void {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public removeHandler({dataItem}): void {
        this.categoryService.delete(dataItem.id)
            .pipe(
                finalize(() => {
                    this.loadGridData();
                })
            )
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Category Deleted', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }, (error) => {
                this._matSnackBar.open('Category Not Deleted', 'Try', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });

    }

    public saveHandler(product: Category): void {
        if (this.isNew) {
            this.categoryService.create(product)
                .pipe(
                    finalize(() => {
                        this.loadGridData();
                    })
                )
                .subscribe(() => {
                    // Show the success message
                    this._matSnackBar.open('Category saved', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                }, (error) => {
                    this._matSnackBar.open('Category Not saved', 'Try', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                });
        } else {
            this.categoryService.update(product)
                .pipe(
                    finalize(() => {
                        this.loadGridData();
                    })
                )
                .subscribe(() => {
                    // Show the success message
                    this._matSnackBar.open('Category Updated', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                }, (error) => {
                    this._matSnackBar.open('Category Not Updated', 'Try', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                });
        }

        this.editDataItem = undefined;
    }

    public cancelHandler(): void {
        this.editDataItem = undefined;
    }

    private loadGridData(): void {
        this.categoryService.getChildren(this.category.id).subscribe(data => this.view = data);
    }
}

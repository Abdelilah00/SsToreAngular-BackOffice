import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../shared/services/category/category.service";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {State} from "@progress/kendo-data-query";
import {Category} from "../../../../shared/models/category.model";
import {finalize} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    animations: fuseAnimations,

})
export class CategoryListComponent implements OnInit {
    view: Category[];
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public editDataItem: Category;
    public isNew: boolean;

    constructor(
        private categoryService: CategoryService,
        private _matSnackBar: MatSnackBar) {
    }


    public ngOnInit(): void {
        this.loadGridData();
    }

    public onStateChange(state: State): void {
        this.gridState = state;
    }

    public addHandler(): void {
        this.editDataItem = new Category();
        this.isNew = true;
    }

    public editHandler({dataItem}): void {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler(): void {
        this.editDataItem = undefined;
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

    private loadGridData(): void {
        this.categoryService.getParents().subscribe(data => this.view = data);
    }
}

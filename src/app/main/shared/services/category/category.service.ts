import {Injectable} from '@angular/core';
import {BaseService} from '../base-service.service';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../models/category.model';
import {Observable} from "rxjs";
import {retry} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class CategoryService extends BaseService<Category> {
    constructor(httpClient: HttpClient) {
        super(httpClient, 'categories', 'admin');
    }

    getParents(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.baseUrl}/getParents`)
            .pipe(retry(1));
    }

    getChildren(parentId: number): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.baseUrl}/getChildren/${encodeURIComponent(String(parentId))}`)
            .pipe(retry(1));
    }
}
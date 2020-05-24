import {Injectable} from '@angular/core';
import {BaseService} from '../base-service.service';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../models/category.model';

@Injectable({
    providedIn: 'root'
})

export class CategoryService extends BaseService<Category> {
    constructor(httpClient: HttpClient) {
        super(httpClient, 'categories', 'admin');
    }
}
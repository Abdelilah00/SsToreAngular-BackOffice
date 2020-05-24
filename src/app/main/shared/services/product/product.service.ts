import {Injectable} from '@angular/core';
import {BaseService} from '../base-service.service';
import {Product} from '../../models/product.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<Product> {
    constructor(httpClient: HttpClient) {
        super(httpClient, 'products', 'user');
    }
}


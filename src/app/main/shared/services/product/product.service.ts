import {Injectable} from '@angular/core';
import {BaseService} from '../base-service.service';
import {Product} from '../../models/product.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

    constructor(httpClient: HttpClient) {
        super(httpClient, 'products', 'admin');
    }

    createWithImages(input): Observable<Product> {
        return this.httpClient.post<Product>(this.baseUrl + '/withImages', input)
            .pipe(retry(1));
    }
}


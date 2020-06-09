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

    createWithImages(input: object): Observable<Product> {
        return this.httpClient.post<Product>(this.baseUrl + '/createWithImages', JSON.stringify(input), this.httpOptions)
            .pipe(retry(1));
    }
}


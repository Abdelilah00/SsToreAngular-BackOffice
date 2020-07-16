import {Injectable} from '@angular/core';
import {BaseService} from '../base-service.service';
import {HttpClient} from '@angular/common/http';
import {ShippingMethod} from '../../models/shipping-method.model';

@Injectable({
    providedIn: 'root'
})
export class ShippingMethodService extends BaseService<ShippingMethod> {

    constructor(httpClient: HttpClient) {
        super(httpClient, 'shippingMethods', 'admin');
    }

}

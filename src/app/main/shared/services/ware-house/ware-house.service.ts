import {Injectable} from '@angular/core';
import {BaseService} from '../base-service.service';
import {HttpClient} from '@angular/common/http';
import {WareHouse} from '../../models/ware-house.model';

@Injectable({
    providedIn: 'root'
})

export class WareHouseService extends BaseService<WareHouse> {
    constructor(httpClient: HttpClient) {
        super(httpClient, 'wareHouses', 'admin');
    }
}

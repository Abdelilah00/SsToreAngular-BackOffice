import {Injectable} from '@angular/core';
import {BaseService} from '../base-service.service';
import {Tag} from '../../models/tag.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TagService extends BaseService<Tag> {

    constructor(httpClient: HttpClient) {
        super(httpClient, 'tags', 'admin');
    }
}

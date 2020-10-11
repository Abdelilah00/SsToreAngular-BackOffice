import {BaseModel} from './base-model.model';

export class Category extends BaseModel {
    id: number;
    name: string;
    parentId: number;
}
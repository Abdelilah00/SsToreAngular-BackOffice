import {BaseModel} from './base-model.model';

class SpecificationDto {
    name: string;
    value: string;
}


class CharacteristicDto {
    name: string;
    values: Array<string>;
}


class ProductReviewsDto {
    stars: number;
    review: string;
    helpful: boolean;
}

export class Product extends BaseModel {


    name: string;
    description: string;
    price: number;
    qte: number;

    images: FileList;
    overviewDiscription: string;
    specifications: SpecificationDto[];


    tagsName: string[];
    categoriesName: number;
    characteristic: CharacteristicDto[];
    wareHouse: string[];
}

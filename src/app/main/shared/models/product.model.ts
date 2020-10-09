import {BaseModel} from './base-model.model';

class Specification {
    name: string;
    value: string;
}


class Characteristic {
    name: string;
    values: Array<string>;
}


class ProductReviews {
    stars: number;
    review: string;
    helpful: boolean;
}

export class Product extends BaseModel {


    name: string;
    comment: string;
    salePrice: number;
    stockQte: number;
    initQte: number;

    images: Blob;
    overview: string;
    specifications: Specification[];


    tagsId: number[];
    categoriesId: number[];
    characteristics: Characteristic[];
    wareHousesId: number[];
}

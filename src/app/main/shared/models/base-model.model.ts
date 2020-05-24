export class BaseModel {
    id: number;
}

export interface IListModel<T extends BaseModel> {
    totalCount: number;
    items: Array<T>;
}

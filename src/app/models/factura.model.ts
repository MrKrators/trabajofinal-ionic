
import { Item } from "./item.model";

export class Factura {

    id?: string;
    date?: any;
    ticket?: any;
    user_id: string;
    items: Item[];
    subtotal: number;
    discount: number;
    total: number


    constructor( user_id: string, items:Item[], subtotal: number, discount: number, total: number) {
        this.user_id = user_id;
        this.items = items;
        this.subtotal = subtotal;
        this.discount = discount;
        this.total = total;


    }

}
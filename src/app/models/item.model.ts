export class Item {

    ID?: any;
    precio: number;
    stock: number;
    producto_id: number;


    constructor(precio: number, stock: number, producto_id: number) {
        this.precio = precio;
        this.stock = stock;
        this.producto_id = producto_id;

    }

}
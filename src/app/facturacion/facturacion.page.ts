import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Item } from '../models/item.model';
import { Producto } from '../models/producto.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { conndata } from '../services/conndata.service';
import { Factura } from '../models/factura.model';
import { Articulo } from '../models/articulo.model';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
})
export class FacturacionPage implements OnInit {
  items: Item[] = [];
  productos: Producto[] = [];
  subscription: Subscription | undefined;
  categorias: Categoria[]= [];
  facturas: Factura[]=[];
  public item_id: string="";
  public cantidad: string="";
  public nombre: string="";
  
  fecha: Date=new Date;
  precio: number=0;
  

  
  constructor(private _conndata: conndata) { }

  ngOnInit() {
    this.getItems();
    this.getProductos();
    this.getCategorias();
    this.getFacturas();
    setTimeout(()=> {
      this.fecha=new Date()
    })
    this.subscription = this._conndata.NFO$.subscribe(() => {
      this.getItems();
      this.getProductos();
      this.getCategorias();
      this.getFacturas();
    })

  }

  getItems(){
    this._conndata.get<Item>('items').subscribe(res => {
      this.items=[];
      this.items=res.data;
      
      })
  }
  
  getProductos() {
    this._conndata.get<Producto>('productos').subscribe((res)=>{
      this.productos=[];
      this.productos=res.data;
      
    })
  }

  getCategorias() {
    this._conndata.get<Categoria>('categorias').subscribe((res)=>{
      this.categorias=[];
      this.categorias=res.data;
      
    })
  }

  getFacturas() {
    this._conndata.get<Factura>('facturas').subscribe(res => {
      this.facturas=[];
      
      this.facturas = res.data;
    })
  }

  addProducto(){
    const articulo: Articulo={
      item_id:parseInt(this.item_id),
      cantidad:parseInt(this.cantidad),
      nombre:this.nombre,
      precio:this.precio,
    }

  }



  addFactura(){

    const factura:Factura={
      ticket: 3,
      user_id: 'd7921bce-4e3b-4214-a021-e6f6ef368c42',
      date: this.fecha,
      subtotal: 0,
      discount: 0,
      total: 0,
      items: []
    }
    this._conndata.post(factura, 'facturas').subscribe(()=>{

    },(error =>{
      console.log(error)
    }))
  }

  

}

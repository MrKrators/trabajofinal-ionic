import { Component, OnInit } from '@angular/core';
import { conndata } from '../services/conndata.service';
import { Item } from '../models/item.model';
import { Producto } from '../models/producto.model';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  items: Item[] = [];
  productos: Producto[] = [];
  subscription: Subscription | undefined;

  constructor( private _conndata: conndata) {   }

  ngOnInit() {
    this.getItems();
    this.getProductos();
    this.subscription = this._conndata.NFO$.subscribe(() => {
      this.getItems();
      this.getProductos();
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


}

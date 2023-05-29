import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Producto } from '../models/producto.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { conndata } from '../services/conndata.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  productos: Producto[] = [];
  categorias: Categoria [] = [];
  subscription: Subscription | undefined;

  constructor(private _conndata: conndata) { }

  ngOnInit() {
    this.getCategorias();
    this.getProductos();
    this.subscription = this._conndata.NFO$.subscribe(() => {
      this.getCategorias();
      this.getProductos();
    })
  }

  getProductos() {
    this._conndata.get<Producto>('productos').subscribe((res)=>{
      this.productos=[];
      this.productos=res.data;
      
    })
  }

  getCategorias() {
    this._conndata.get<Categoria>('categorias').subscribe(res => {
      this.categorias=[];
      this.categorias = res.data;

    })
  }

}

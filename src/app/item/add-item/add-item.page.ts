import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Item } from 'src/app/models/item.model';
import { Producto } from 'src/app/models/producto.model';
import { conndata } from 'src/app/services/conndata.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  productos: Producto[]=[];
  subscription: Subscription | undefined;
  public precio: string ="";
  public stock: string="";
  public producto_id: string="";
  
  constructor(
    private _conndata:conndata
  ) { }

  ngOnInit() {
    this.getProductos();
    this.subscription=this._conndata.NFO$.subscribe(()=>{
      this.getProductos();
    })
  }

  getProductos(){
    this._conndata.get<Producto>('productos').subscribe(res => {
      this.productos=[];
      
      this.productos = res.data;
    })
  }

addItem(){
  const item:Item={
    precio:parseInt(this.precio),
    stock:parseInt(this.stock),
    producto_id:parseInt(this.producto_id),
  }
  this._conndata.post(item, 'items').subscribe(()=>{
    
  },(error =>{
    console.log(error)
  }))
 location.reload()
}

}

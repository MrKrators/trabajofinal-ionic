import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/producto.model';
import { conndata } from 'src/app/services/conndata.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage implements OnInit {
  categorias: Categoria[] = [];
  subscription: Subscription | undefined;
  public nombre: string ="";
  public detalle: string="";
  public categoria_id: string="";

  constructor(
    private _conndata:conndata
  ) { }

  ngOnInit() {
    this.getCategorias();
    this.subscription = this._conndata.NFO$.subscribe(()=>{
      this.getCategorias();
    })
  }

  getCategorias(){
    this._conndata.get<Categoria>('categorias').subscribe(res => {
      this.categorias=[];
      
      this.categorias = res.data;
    })
  }

  addProducto(){
    const producto:Producto={
      nombre:this.nombre,
      detalle:this.detalle,
      categoria_id:parseInt(this.categoria_id),
    }
    this._conndata.post(producto, 'productos').subscribe(()=>{

    },(error =>{
      console.log(error)
    }))
    location.reload()
  }
}

import { Component, OnInit } from '@angular/core';

import { Categoria } from 'src/app/models/categoria.model';



import { conndata } from 'src/app/services/conndata.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.page.html',
  styleUrls: ['./add-categoria.page.scss'],
})
export class AddCategoriaPage implements OnInit {
  public nombre: string="";
 

  constructor(
    public _conndata: conndata,
  ) { }

  ngOnInit() {
    
  }

 
  addCategoria() {
   const categoria:Categoria={
    nombre:this.nombre,
   }
   this._conndata.post(categoria, 'categorias').subscribe(()=>{
    
   },(error =>{
    console.log(error)
   }))
   location.reload()
  }

  
 
  }


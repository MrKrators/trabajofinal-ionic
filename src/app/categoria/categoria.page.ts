import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { conndata } from '../services/conndata.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})

export class CategoriasPage implements OnInit {
  categorias: Categoria[] = [];

  subscription: Subscription | undefined;

  constructor(
    private _conndata: conndata
  ) {

  }

  ngOnInit() {
    this.getCategorias();
    this.subscription = this._conndata.NFO$.subscribe(()=>{
      this.getCategorias();
    })

  }

  getCategorias() {
    this._conndata.get<Categoria>('categorias').subscribe(res => {
      this.categorias=[];
      
      this.categorias = res.data;
    })
  }

  }


import { Component, OnInit } from '@angular/core';
import { Factura } from '../models/factura.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { conndata } from '../services/conndata.service';

@Component({
  selector: 'app-ver-facturas',
  templateUrl: './ver-facturas.page.html',
  styleUrls: ['./ver-facturas.page.scss'],
})
export class VerFacturasPage implements OnInit {
  facturas: Factura[]=[];
  subscription: Subscription | undefined;

  constructor(private _conndata: conndata) { }

  ngOnInit() {
    this.getFacturas();
    this.subscription = this._conndata.NFO$.subscribe(()=>{
      this.getFacturas();
    })
}
  
getFacturas() {
    this._conndata.get<Factura>('facturas').subscribe(res => {
      this.facturas=[];
      
      this.facturas = res.data;
    })
  }

}

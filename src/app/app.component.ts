import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  visible: boolean=true;
  public menuLista:any[]=[];
  subscription: Subscription | undefined;

  constructor(private _loginService:LoginService, private router: Router) {
    
    this._loginService.validador();
    this.sesionUsuario();
    

  }
  
  menu(){
    this.menuLista = [
      { title: 'Ver Items', url: '/item', hidden: !this.visible },
      { title: 'Ver Categorias', url: '/categoria', hidden: !this.visible },
      { title: 'Ver Productos', url: '/producto', hidden: !this.visible },
      { title: 'Generar facturas', url: '/facturacion', hidden: !this.visible },
      { title: 'Ver Facturas', url: '/ver-facturas', hidden: !this.visible }, 
    ]
  }

  sesionUsuario(){
    this._loginService.datosDeSesion().subscribe({
      next: roto =>{
        
        if (roto!="undefined") {
          this.visible = false;
          this.menu();
          console.log('si entra'+roto);
        }else{
          this.visible = true;
          this.menu();
          console.log('no entra'+roto);
        }
        
      }
    })

    } 
    
    salir() {
      this._loginService.deslogearse().then(() => {
        this.router.navigate(['/login']);
       
        
        
      })
    };
  }



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
    this.salir();
    this._loginService.validador();
    this.sesionUsuario();
    

  }
  
  menu(){
    this.menuLista = [
      { title: 'Categorias', url: '/categoria', hidden: !this.visible },
      { title: 'Facturacion', url: '/facturacion', hidden: !this.visible },
      { title: 'Items', url: '/item', hidden: !this.visible },
      { title: 'Login', url: '/login', hidden: !this.visible },
      { title: 'Productos', url: '/producto', hidden: !this.visible },
      { title: 'Ver Facturas', url: '/ver-facturas', hidden: !this.visible }, 
      
    ]
  }

  sesionUsuario(){
    this._loginService.datosDeSesion().subscribe({
      next: roto =>{
        
        if (roto!="") {
          this.visible = false;
          this.menu();
          console.log('si entra');
        }else{
          this.visible = true;
          this.menu();
          console.log('no entra');
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



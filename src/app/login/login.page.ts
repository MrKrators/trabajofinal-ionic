import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string ="usuario@usuario.com";
  public password: string ="contrasena";
  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }

onLogin(){
  this.loginService.logearse(this.email,this.password).then(async(res)=>{
    console.log(res.data.token)

   
      await Preferences.set({
        key: 'token',
        value: res.data.token,
      });
   

  })
}

async onNombreUsuario(){
  const { value } = await Preferences.get({ key: 'token' });
  if(value)
  this.loginService.nombreUsuario(value).then(async(res)=>{
    console.log(res.data.token)
    });
  }
} 

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string ="";
  public password: string ="";
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
   location.reload();
   

  })
}


} 

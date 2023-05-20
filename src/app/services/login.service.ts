import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
    
    this.validador();  
    
   }

  logearse = async (email:string , password:string) => {
    const options = {
      url: environment.backend + 'users/login',
      headers: { 
            accept: 'application/json',
            'Content-Type': 'application/json',
            },
      data: { email: email, password: password },
    };
    const response: HttpResponse = await Http.post(options);
    return response;
  };

  nombreUsuario = async(token:string) => {
    const options = {
      url: 'WhoAmI',
      headers: { 
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' +token,
        },
    };
    const response: HttpResponse = await Http.get(options);
    return response;
   };

  guardaUsuario(token: string): void {
    Preferences.set({
      key: 'token',
      value: token,
    });
  }

  usuarioReal = new BehaviorSubject<string>("");

  datosDeSesion(): Observable<string> {
    return this.usuarioReal.asObservable();
  }

  validador() {
    let flecha = Preferences.get({ key: 'token' });
    flecha.then(res => {
      if (res.value) {
        let punta = res.value
        this.updateUsuario(punta);
      }
    })
  }

  updateUsuario(datos: string) {
    return this.usuarioReal.next(datos);
  }

  deslogearse(): Promise<void> {
    this.updateUsuario("");
    return Preferences.remove({ key: 'token' });
  }

}

import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from } from 'rxjs/internal/observable/from';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class conndata {

  private _NFO$ = new Subject<void>();
  private BACKE: any;

  constructor() {
    this.BACKE ={
      url:environment.backend,
      headers:{ "content-type": "application/json" }
    } ;
  }

  get NFO$() {
    return this._NFO$;
  }

  //get all data
  get<tipo>(rutaback: string): Observable<HttpResponse> {
    const options = {
      url: this.BACKE.url+ rutaback,
    };
    return from(CapacitorHttp.get(options));
  }
  
  //get data by ID
  getId<tipo>(id: any, rutaback: string): Observable<HttpResponse> {
    const options = {
      url: this.BACKE.url + rutaback + '/' + id,
    };
    return from(CapacitorHttp.get(options));
  }
  
  //create a new data
  post(datos: any, rutaback: string): Observable<HttpResponse> {
    const options = {
      url: this.BACKE.url + rutaback,
      headers: this.BACKE.headers,
      data: datos,
    };
    ;
    return from(CapacitorHttp.post(options))
      .pipe(
        tap(() => {
          this._NFO$.next();
        })
      );
  }

  //delete data
  delete(id: number, rutaback: string): Observable<HttpResponse> {
    const options = {
      url: this.BACKE.url+ rutaback + '/' + id,
    };
    return from(CapacitorHttp.delete(options))
      .pipe(
        tap(() => {
          this._NFO$.next();
        })
      );
  }

  //update data
  patch(id: number, datos: any, rutaback: string): Observable<HttpResponse> {
    const options = {
      url: this.BACKE.url + rutaback + '/' + id,
      headers: this.BACKE.headers,
      data: datos,
    };
    return from(CapacitorHttp.patch(options))
      .pipe(
        tap(() => {
          this._NFO$.next();
        })
      );
  }
}
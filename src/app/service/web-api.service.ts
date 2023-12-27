import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class  WebApiService {


  constructor(private http: HttpClient) {
    //this.cargarProductos("http://localhost:4201/ejemplo");
    this.cargaProductos();
  }
  productos: any[] = [];

  // Get call method
  // Param 1 : authToken
  // Param 2 : url
  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control' : 'no-cache',
        'Pragma' : 'no-cache'
      }),
      observe: "response" as 'body'
    };

    return this.http.get(
      url,
      httpOptions
    )
      .pipe(
        map((resp: any) => this.ReturnResponseData(resp)),
        catchError(this.handleError)
      );
  }

  cargarProductos(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control' : 'no-cache',
        'Pragma' : 'no-cache'
      }),
      observe: "response" as 'body'
    };

    return this.http.get(
       url,
       httpOptions
    )
    .pipe(
      map((resp: any) => this.productos = resp),
      catchError(this.handleError)
    );
  }


  // Post call method
  // Param 1 : authToken
  // Param 2 : url
  // Param 3 : model
  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };

    return this.http.post(
      url,
      model,
      httpOptions)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }


  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }

  private cargaProductos() {
    this.http.get('http://localhost:4201/ejemplo')
    .subscribe((resp: any) => {
      this.productos = resp;
      console.log(this.productos);
    });
  }
}

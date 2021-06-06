import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../model/Compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(
    private http: HttpClient) { }
    
    postCompra(compra: Compra) : Observable<Compra> {
      return this.http.post<Compra>('http://localhost:8080/compra', compra)
    }

    getAllCompra() : Observable<Compra[]> {
      return this.http.get<Compra[]>('http://localhost:8080/compra')
    }

    putCompra(compra: Compra) : Observable<Compra> {
      return this.http.put<Compra>('http://localhost:8080/compra', compra)
    }
    
}
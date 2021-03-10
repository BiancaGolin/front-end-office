
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient) { }

  postProduto(prod: Produto) : Observable<Produto> {
    return this.http.post<Produto>('http://localhost:8080/produto', prod)
  }
}

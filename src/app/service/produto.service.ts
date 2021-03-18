
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

  getAllProduto() : Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:8080/produto')
  }

  getByIdProduto(id : number) : Observable<Produto>{
    return this.http.get<Produto>(`http://localhost:8080/produto/id/${id}`)

  }

  getByNomeProduto(nome: string) : Observable<Produto[]>{
    return this.http.get<Produto[]>(`http://localhost:8080/produto/nomeProduto/${nome}`)

  }

  postProduto(prod: Produto) : Observable<Produto> {
    return this.http.post<Produto>('http://localhost:8080/produto', prod)
  }




}

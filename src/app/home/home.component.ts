import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaProdutos: Produto[]
  usuarioLogado: boolean

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.checaUsuarioLogado();
    this.findAllProdutos()
  }

  findAllProdutos() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
      console.log(resp)
    })

  }

  checaUsuarioLogado(){
    if(environment.nomeUsuario != ''){
      console.log("usuario ta logado")
      console.log(environment.nomeUsuario)
      return true;
    }
    console.log("usuario nao ta logado")
    return false;
  }
}

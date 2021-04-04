import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';
import { Imagem } from '../model/Imagem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagem: Imagem = new Imagem()
  listaImagens: Imagem[]

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  imgPathInput = ""

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.findAllProdutos()
    this.produto.imagem = []
  }

  findAllProdutos() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })

  }
}

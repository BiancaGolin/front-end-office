import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaProduto: Produto[]

  constructor(
    private router: Router,
    private produtoService: ProdutoService     
  ) { }

  ngOnInit() {
  // this.findAllProduto()
  }

 //  findAllProduto() {
    // this.produtoService.getAllProduto().subscribe((resp: Produto[]) =>{
     //  this.listaProduto = resp
    // })
 //  }

}

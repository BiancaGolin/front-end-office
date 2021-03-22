import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-visualizar-produto',
  templateUrl: './visualizar-produto.component.html',
  styleUrls: ['./visualizar-produto.component.css']
})
export class VisualizarProdutoComponent implements OnInit {

  produto: Produto = new Produto ()
  listaProdutos: Produto[]
  idProduto: number

  constructor(
    private router :  Router,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProduto(this.idProduto)
    console.log("id=",this.idProduto)
  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

}

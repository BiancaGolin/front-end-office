import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toHtml } from '@fortawesome/fontawesome-svg-core';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaProduto: Produto[]
  idProduto: number
  nomePrd: string

  constructor(
    private router:  Router,
    private produtoService: ProdutoService,
    private alerta: AlertasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    this.findAllProduto()
    this.findByIdProduto()
  }

  findAllProduto() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProduto = resp
    })

  }

  findByIdProduto(){
    this.produtoService.getByIdProduto(this.idProduto).subscribe((resp : Produto)=>{
      this.produto = resp
    })
  }

  findByNomeProduto(){
    this.produtoService.getByNomeProduto(this.nomePrd).subscribe((resp : Produto[])=>{
      this.listaProduto = resp
    })
  }

}

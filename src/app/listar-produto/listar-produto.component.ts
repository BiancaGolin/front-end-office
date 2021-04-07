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
  nomeProduto: string

  constructor(
    private router:  Router,
    private produtoService: ProdutoService, 
    private alerta: AlertasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    this.findAllProduto()
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
    this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp : Produto[])=>{
      this.listaProduto = resp
    })
  }

}
 
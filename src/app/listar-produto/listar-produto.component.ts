import { ThrowStmt } from '@angular/compiler';
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

  selectedStatus: number;
  status: any = [0, 1];
  
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

    /* this.idProduto = this.route.snapshot.params['id']
    this.findByIdProduto(this.idProduto) */
  }

  findAllProduto() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProduto = resp
    })

  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  findByNomeProduto(){
    this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp : Produto[])=>{
      this.listaProduto = resp
    })
  }

  radioChangeHandler (event: any) {
    this.selectedStatus = event.target.value;

    if (this.selectedStatus == 1) {
      this.produto.status = true
    } else {
      this.produto.status = false
    }
    
    console.log("event target", event.target.value)
  }

/*   salvar(id: number) {
    let editarProduto = this.findByIdProduto(id)

    console.log(editarProduto)    
    

    this.produto.id = this.idProduto
    console.log(this.produto.id)

     this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      this.router.navigate(['/listar-produto'])
      this.alerta.showAlertSucess('Produto alterado com sucesso')
    }, err => {
      if(err.status == '500'){
        this.alerta.showAlertDanger('Preencha todos os campos corretamente antes de enviar!')
      }
      if(err.status == '400'){
        alert('Usuário não autorizado')
      }
    })
  } */

}

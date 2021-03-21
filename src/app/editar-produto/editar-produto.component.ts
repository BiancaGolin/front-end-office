import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  selectedStatus: number;
  status: any = [0, 1];

  produto: Produto = new Produto ()
  listaProdutos: Produto[]
  idProduto: number


  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.findByIdProduto(this.idProduto)
  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  salvar() {
    this.produto.id = this.idProduto
    console.log("id = ", this.produto.id)
    this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      this.router.navigate(['/listar-produto'])
      this.alert.showAlertSucess('Produto alterado com sucesso')
    }, err => {
      if(err.status == '500'){
        this.alert.showAlertDanger('Preencha todos os campos corretamente antes de enviar!')
      }
      if(err.status == '400'){
        alert('Usuário não autorizado')
      }
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

}

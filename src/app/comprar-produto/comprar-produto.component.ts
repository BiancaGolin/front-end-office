import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-comprar-produto',
  templateUrl: './comprar-produto.component.html',
  styleUrls: ['./comprar-produto.component.css']
})
export class ComprarProdutoComponent implements OnInit {
  globals: Globals;
  selectedStatus: number;
  status: any = [0, 1];

  produto: Produto = new Produto ()
  listaProdutos: Produto[]
  idProduto: number

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService,
    globals: Globals
  ) {
    this.globals = globals;
  }

  ngOnInit() {
    window.scroll(0,0)
    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProduto(this.idProduto)
    console.log("id editar=",this.idProduto)
  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
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

  addCarrinho(){
    // console.log(this.globals.cesta);

    if(!this.carrinhoJaPossui()){
      this.globals.cesta.push(this.produto);
      this.globals.qnt.push(1);
    }else{
      this.incrementaQtd();
    }
    this.router.navigate(['/carrinho'])
  }

  incrementaQtd(){
    for(let i=0; i<this.globals.cesta.length; i++){
      if(this.globals.cesta[i].id == this.produto.id){
        this.globals.qnt[i] ++;
      }
    }
  }

  carrinhoJaPossui(){
    // console.log('verificando ...')
    for(let i=0; i<this.globals.cesta.length; i++){
      if(this.globals.cesta[i].id == this.produto.id){
        // console.log(this.globals.cesta[i]);
        return true;
      }
    }
    // console.log('n possui')
    return false;
  }
}

import { NumberFormatStyle } from '@angular/common';
import { QueryBindingType } from '@angular/compiler/src/core';
import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Carrinho } from '../model/Carrinho';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  // value = 1;
  globals: Globals;
  total = 0.0;
  subtotal = 0.0;
  frete = 0.0;
  totalIndividual: number[];
  selectedFreteRadio: number;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService,
    globals: Globals
  ) {
    this.globals = globals;
    this.totalIndividual = [];
    // this.calculaSubTotal()
  }

  ngOnInit() {
    window.scroll(0,0)
    this.totalIndividual = [];
    this.calculaResumo();
  }

  calculaTotalIndividual(){
    if(this.globals.cesta.length > 0){
      for(let i=0; i < this.globals.cesta.length; i++){
        this.totalIndividual.push(this.globals.cesta[i].preco * this.globals.qnt[i]);
      }
    }
  }


  calculaSubTotal(){
    this.subtotal = 0.0;
    if(this.totalIndividual.length > 0){
      for(let i=0; i < this.globals.cesta.length; i++){
        this.subtotal += this.totalIndividual[i];
      }
    }
  }

  calculaTotal(){
    this.total = this.subtotal + this.frete;
  }

  incrementaQtd(indexProd: number){
    if(this.globals.qnt[indexProd] < this.globals.cesta[indexProd].qtdEstoque){
      this.globals.qnt[indexProd] ++;
      this.calculaResumo();
      this.totalIndividual[indexProd] = this.globals.cesta[indexProd].preco * this.globals.qnt[indexProd];
    }else(
      alert('Quantidade maxima disponivel!')
    )

    this.calculaResumo();
    this.totalIndividual[indexProd] = this.globals.cesta[indexProd].preco * this.globals.qnt[indexProd];
  }

  decrementaQtd(indexProd: number){
    if(this.globals.qnt[indexProd] > 1){
      this.globals.qnt[indexProd] --;
      this.calculaResumo();
      this.totalIndividual[indexProd] = this.globals.cesta[indexProd].preco * this.globals.qnt[indexProd];
    }
    this.calculaResumo();
    this.totalIndividual[indexProd] = this.globals.cesta[indexProd].preco * this.globals.qnt[indexProd];
  }

  calculaResumo(){
    this.calculaTotalIndividual();
    this.calculaSubTotal();
    this.calculaTotal();
  }

  freteChangeHandler (event: any) {
    this.selectedFreteRadio = event.target.value;

    if(this.selectedFreteRadio == 0){
      this.frete = 0.00;
      this.calculaResumo()
    }
    else if(this.selectedFreteRadio == 1){
      this.frete = 7.90;
      this.calculaResumo()
    }
    else if(this.selectedFreteRadio == 2){
      this.frete = 15.50;
      this.calculaResumo()
    }

    this.calculaResumo()
   }

  
  //REMOVE O PRODUTO DA LISTA E ATUALIZA O CARRINHO
  removeProduct(index: number) {
    this.globals.cesta.splice(index,1)
    this.globals.qnt.splice(index,1)
    this.totalIndividual.splice(index,1)
    this.calculaResumo()
  }

  goTopay(){
    this.globals.selFrete = this.selectedFreteRadio
    this.router.navigate(['/payment'])
  }

}

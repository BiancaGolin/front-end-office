import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  globals: Globals;
  total = 0.0;
  subtotal = 0.0;
  frete = 0.0;
  qtdTotal= 0;
  totalIndividual: number[];
  selectedFrete: number;
  payMethName: string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    globals: Globals
  ) {
    this.globals = globals;
    this.totalIndividual = [];
  }

  ngOnInit(){
    this.totalIndividual = [];
    this.freteSelector();
    this.calculaResumo();
    this.calculaQtdTotal();
    this.setPayMeth();
  }

  setPayMeth(){
    if(this.globals.payMeth == 0){
      this.payMethName = "Cartão de crédito"
    }else{
      this.payMethName = "Boleto"
    }
  }

  calculaResumo(){
    this.calculaTotalIndividual();
    this.calculaSubTotal();
    this.calculaTotal();
  }

  calculaTotalIndividual(){
    if(this.globals.cesta.length > 0){
      for(let i=0; i < this.globals.cesta.length; i++){
        this.totalIndividual.push(this.globals.cesta[i].preco * this.globals.qnt[i]);
      }
    }
  }

  calculaTotal(){
    this.total = this.subtotal + this.frete;
  }

  calculaSubTotal(){
    this.subtotal = 0.0;
    if(this.totalIndividual.length > 0){
      for(let i=0; i < this.globals.cesta.length; i++){
        this.subtotal += this.totalIndividual[i];
      }
    }
  }

  calculaQtdTotal(){
    for(let i =0; i < this.globals.qnt.length; i++ ){
      this.qtdTotal += this.globals.qnt[i]
    }
  }

  freteSelector() {
    if(this.globals.selFrete == 0){
      this.frete = 0.00;
    }
    else if(this.globals.selFrete == 1){
      this.frete = 7.90;
    }
    else if(this.globals.selFrete == 2){
      this.frete = 15.50;
    }
   }

   backToPayment(){
    this.router.navigate(['/payment'])
   }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Globals } from '../globals';
import { Cliente } from '../model/Cliente';
import { Compra } from '../model/Compra';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CompraService } from '../service/compra.service';

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
  pagePedNum: number;
  cliente: Cliente;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compraService: CompraService,
    private alerta: AlertasService,
    private authService: AuthService,
    globals: Globals
  ) {
    this.globals = globals;
    this.totalIndividual = [];
  }

  ngOnInit(){
    // this.findByIdCliente(environment.idCliente)
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

  listaDeProdutos(){
    let listaProd :Produto[] = []
    let tmpProd :Produto = new Produto()
    for(let i = 0; i< this.globals.cesta.length; i++){
      for(let j = 0; j < this.globals.qnt[i]; j++){
        tmpProd.id = this.globals.cesta[i].id
        listaProd.push(tmpProd)
      }
    }
    return listaProd;
  }

  limpaGlobals(){
    this.globals.cesta = [];
    this.globals.qnt = [];
  }

  finalizarCompra(){
    if(environment.idCliente != 0){
      let compra :Compra = new Compra();
      compra.produtosVinculados = this.globals.cesta
      // compra.produtosVinculados = this.listaDeProdutos()

      compra.enderecoEntrega = this.globals.selAddrName
      compra.nParcelas = this.globals.qtdVezes
      compra.formaPagamento = this.globals.payMeth
      compra.valorTotal = this.total
      compra.frete = this.frete
      compra.idUsuario = environment.idCliente
      compra.numeroPedido = Math.floor(100000000 + Math.random() * 900000000);
      compra.statusPedido = "Aguardando Confirmação de Pagamento"
      console.log("User = " + JSON.stringify(compra));
      this.pagePedNum = compra.numeroPedido;
      this.compraService.postCompra(compra).subscribe((resp: Compra) =>{
        console.log(resp)

        this.alerta.showAlertSucess('Sucesso! Pedido '+compra.numeroPedido+' foi efetuado e esta aguardando pagamento.')
        this.limpaGlobals();
        this.router.navigate(['/home'])
      })
    }else{
      this.router.navigate(['/login-cliente'])
    }
  }

  // findByIdCliente(id: number) {
  //   this.authService.getByIdCliente(id).subscribe((resp: Cliente) => {
  //     this.cliente = resp
  //     console.log(this.cliente);
  //   })
  // }

}

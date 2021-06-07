import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from '../model/Compra';
import { CompraService } from '../service/compra.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent implements OnInit {

  idCompra: number
  payMethName: string;
  qtdTotal= 0;
  subtotal = 0.0;
  frete = 0.0;
  total = 0.0;
  compra: Compra = new Compra()
  totalIndividual: number[];

  constructor(
    private compraService: CompraService,
    private router:  Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idCompra = this.route.snapshot.params['id']
    this.findByIdCompra(this.idCompra);
    console.log("AWEHOOO" + this.idCompra.toString())
  }

  findByIdCompra(id: number) {
    this.compraService.getByIdCompra(id).subscribe((resp: Compra) => {
      this.compra = resp
      this.total = this.compra.valorTotal;
      this.setPayMeth();
      this.frete = this.compra.frete;
      this.qtdTotal = this.compra.produtosVinculados.length;
      this.subtotal = this.total - this.frete;
    })
  }

  setPayMeth(){
    if(this.compra.formaPagamento == 0){
      this.payMethName = "Cartão de crédito"
    }else{
      this.payMethName = "Boleto"
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Cliente } from '../model/Cliente';
import { Endereco } from '../model/Endereco';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  globals: Globals;
  cliente: Cliente = new Cliente()
  enderecos: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    globals: Globals
  ) {
      this.globals = globals;
  }

  ngOnInit(): void {

    //console.log('MUDAR PARA USUARIO LOGADO')
    this.findByIdCliente(2)
    console.log(this.cliente.nomeCliente);
    this.globals.qtdVezes = 1;
    // this.cliente.enderecoEntrega
  }

  findByIdCliente(id: number) {
    this.authService.getByIdCliente(id).subscribe((resp: Cliente) => {
      this.cliente = resp
      console.log(this.cliente);
      this.consultaCepEntrega(this.cliente.cepEntrega, 0)
      this.consultaCepEntrega(this.cliente.cepFaturamento, 1)
      // this.enderecos[0] = this.cliente.cepEntrega
      // this.enderecos[1] = this.cliente.cepFaturamento
    })
  }

  changePayMethod(evt: any){
    var target = evt.target;
    if (evt.target.value == 0) {
      this.globals.payMeth = 0;
    }else{
      this.globals.payMeth = 1;
    }
  }

  getQtdVezes(evt: any){
    var target = evt.target;
    if(target.value >= 0){
      this.globals.qtdVezes = target.value;
    }else{
      this.globals.qtdVezes = 1;
    }
  }

  getAdrrsString(evt: any){
    var target = evt.target;
    this.globals.selAddrName = this.enderecos[target.value]
  }

  consultaCepEntrega(cep: any, index: number) {
    // cep="04673-150"
    this.authService.consultaCepEnderecoCOmpleto(cep).subscribe((cepEntregaPreenchido: Endereco) => {
      this.authService.validarCep(cep).subscribe((cepEntregaValido: Boolean) => {
        console.log(cepEntregaPreenchido.logradouro + cepEntregaPreenchido.complemento)
        this.enderecos[index] = (
                              cepEntregaPreenchido.logradouro + ', '
                              + '000' + ' - '
                              + cepEntregaPreenchido.bairro + ' - '
                              + cepEntregaPreenchido.localidade + ', '
                              + cepEntregaPreenchido.uf + ' - '
                              + cep
                              )
          this.globals.selAddrName = this.enderecos[0];
      })
    })
  }


  goToCheckout(){
    this.router.navigate(['/checkout'])
  }
  backToCarrinho(){
    this.router.navigate(['/carrinho'])
   }

}

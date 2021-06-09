import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Cliente } from '../model/Cliente';
import { ClienteLogin } from '../model/ClienteLogin';
import { Endereco } from '../model/Endereco';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = new Cliente()
  listaClientes: Cliente[]
  idCliente: number
  clienteLogin: ClienteLogin = new ClienteLogin()


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
    ) {}

  ngOnInit(){
    window.scroll(0,0)
    this.idCliente = environment.idCliente
    this.findByIdCliente(this.idCliente)
    console.log("id cliente = ", this.idCliente)
  }

  findByIdCliente(id: number) {
    this.authService.getByIdCliente(id).subscribe((resp: Cliente) => {
      this.cliente = resp
      this.consultaCepFaturamento()
      this.consultaCepEntrega()
    })
  }

  consultaCepEntrega() {
    this.authService.consultaCepEnderecoCOmpleto(this.cliente.cepEntrega).subscribe((cepEntregaPreenchido: Endereco) => {
      this.authService.validarCep(this.cliente.cepEntrega).subscribe((cepEntregaValido: Boolean) => {

        if (cepEntregaValido == false) {
          this.alert.showAlertInfo("Por favor preencha o cep entrega valido")
        }
        else {
          this.cliente.enderecoEntrega = cepEntregaPreenchido.logradouro + cepEntregaPreenchido.complemento
          this.cliente.cidade = cepEntregaPreenchido.localidade
          this.cliente.uf = cepEntregaPreenchido.localidade
          this.cliente.cepEntrega = cepEntregaPreenchido.cep
          this.cliente.uf = cepEntregaPreenchido.uf
        }

      })


    })
  }

  consultaCepFaturamento() {
    this.authService.consultaCepEnderecoCOmpleto(this.cliente.cepFaturamento).subscribe((cepFaturamentoPreenchido: Endereco) => {
      this.authService.validarCep(this.cliente.cepFaturamento).subscribe((cepFaturamentoValido: Boolean) => {

        if (cepFaturamentoValido == false) {
          this.alert.showAlertInfo("Por favor preencha o cep faturamento valido")
        }
        else {
          this.cliente.enderecoFaturamento = cepFaturamentoPreenchido.logradouro + cepFaturamentoPreenchido.complemento
          this.cliente.cidadeFaturamento = cepFaturamentoPreenchido.localidade
          this.cliente.ufFaturamento = cepFaturamentoPreenchido.uf
          this.cliente.cepEntrega = cepFaturamentoPreenchido.cep
        }

      })


    })

  }

  editarCliente() {
    this.cliente.id = this.idCliente
    this.authService.alterarCliente(this.cliente).subscribe((resp: Cliente) => {
      this.cliente = resp
      this.router.navigate(['/home'])
      this.alert.showAlertSucess('Usuário alterado com sucesso')
    }, err => {
      if(err.status == '500'){
        this.alert.showAlertDanger('Preencha todos os campos corretamente antes de enviar!')
      }
      if(err.status == '400'){
        alert('Usuário não autorizado')
      }
    })
  }

}

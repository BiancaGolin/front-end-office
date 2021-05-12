import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../model/Cliente';
import { Endereco } from '../model/Endereco';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  cliente: Cliente = new Cliente()

  constructor(
    private router: Router,
    private alerta: AlertasService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  consultaCepEntrega() {
    this.authService.consultaCepEnderecoCOmpleto(this.cliente.cepEntrega).subscribe((cepEntregaPreenchido: Endereco) => {
      this.authService.validarCep(this.cliente.cepEntrega).subscribe((cepEntregaValido: Boolean) => {

        if (cepEntregaValido == false) {
          this.alerta.showAlertInfo("Por favor preencha o cep entrega valido")
        }
        else {
          this.cliente.enderecoEntrega = cepEntregaPreenchido.logradouro + cepEntregaPreenchido.complemento
          this.cliente.cidade = cepEntregaPreenchido.localidade
          this.cliente.uf = cepEntregaPreenchido.localidade
          this.cliente.cepEntrega = cepEntregaPreenchido.cep
        }

      })


    })
  }

  consultaCepFaturamento() {
    this.authService.consultaCepEnderecoCOmpleto(this.cliente.cepFaturamento).subscribe((cepFaturamentoPreenchido: Endereco) => {
      this.authService.validarCep(this.cliente.cepFaturamento).subscribe((cepFaturamentoValido: Boolean) => {

        if (cepFaturamentoValido == false) {
          this.alerta.showAlertInfo("Por favor preencha o cep faturamento valido")
        }
        else {
          this.cliente.enderecoFaturamento = cepFaturamentoPreenchido.logradouro + cepFaturamentoPreenchido.complemento
          this.cliente.cidadeFaturamento = cepFaturamentoPreenchido.localidade
          this.cliente.uf = cepFaturamentoPreenchido.localidade
          this.cliente.cepEntrega = cepFaturamentoPreenchido.cep
        }

      })


    })

  }

  cadastrarCliente() {
    this.authService.validaCpf(this.cliente.cpf).subscribe((cpfValido: Boolean) => {
      this.authService.validaNome(this.cliente.nomeCliente).subscribe((nomeComposto: Boolean) => {
        this.authService.validarCep(this.cliente.cepFaturamento).subscribe((cepFaturamentoValido: Boolean) => {
          this.authService.validarCep(this.cliente.cepEntrega).subscribe((cepEntregaValido: Boolean) => {


            if (cpfValido == false) {
              this.alerta.showAlertInfo("Por favor preencha com o CPF corretamente")
            } else if (nomeComposto == false) {
              this.alerta.showAlertInfo("Por favor preencha o nome completo")
            } else if (cepFaturamentoValido == false) {
              this.alerta.showAlertInfo("Por favor preencha o cep faturamento valido")
            } else if (cepEntregaValido == false) {
              this.alerta.showAlertInfo("Por favor preencha o cep entrega valido")
            } else if (this.cliente.nomeCliente.indexOf(' ') == -1) {
              this.alerta.showAlertInfo("Por favor preencha o nome completo")
            } else if (this.cliente.nomeCliente == null || this.cliente.nomeCliente.length < 5) {
              this.alerta.showAlertInfo('Preencha o campo de nome do cliente corretamente')
            }
            else if (this.cliente.emailCliente == null || this.cliente.emailCliente.indexOf('@' && '.') == -1) {
              this.alerta.showAlertInfo('Preencha o campo de email corretamente')
            }
            else if (this.cliente.senhaCliente == null || this.cliente.senhaCliente.length < 3) {
              this.alerta.showAlertInfo('Preencha o campo de senha corretamente')
            } else {
              this.authService.cadastrarCliente(this.cliente).subscribe((resp: Cliente) => {

                this.cliente = resp

                console.log("Teste usuario retorno: " + this.cliente)

                this.router.navigate(['/home'])
                if (this.cliente.nomeCliente == "CPF já cadastrado") {
                  this.cliente.nomeCliente = ""
                  this.router.navigate(['/cadastro-cliente'])
                  this.alerta.showAlertSucess('CPF já cadastrado, favor cadastrar outro CPF.')
                } else if (this.cliente.emailCliente == 'email ja cadastrado') {
                  console.log("email  ja cadastrado step")
                  this.router.navigate(['/cadastro-cliente'])
                  this.alerta.showAlertSucess('Email já cadastrado')
                } else {
                  console.log("email n cadastrado step")
                  this.alerta.showAlertSucess('Usuário cadastrado com sucesso!')
                }
              }
              )
            }
          })
        })
      })
    })
  }
}

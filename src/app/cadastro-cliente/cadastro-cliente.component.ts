import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../model/Cliente';
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
    window.scroll(0,0)
  }

  cadastrarCliente() {
    console.log(JSON.stringify(this.cliente))
    if (this.cliente.nomeCliente == null || this.cliente.nomeCliente.length < 5){
      this.alerta.showAlertInfo('Preencha o campo de nome do usuário corretamente')
    } 
    else if(this.cliente.emailCliente == null || this.cliente.emailCliente.indexOf('@' && '.') == -1){
      this.alerta.showAlertInfo('Preencha o campo de email corretamente')
    } 
    else if(this.cliente.senhaCliente == null || this.cliente.senhaCliente.length <3){
      this.alerta.showAlertInfo('Preencha o campo de senha corretamente')
    } else {
      this.authService.cadastrarCliente(this.cliente).subscribe((resp: Cliente) =>{
        this.cliente = resp
        this.router.navigate(['/home'])
        if(this.cliente.emailCliente == 'email ja cadastrado'){
        console.log("email  ja cadastrado step")
        this.router.navigate(['/cadastro-cliente'])
        this.alerta.showAlertSucess('Email já cadastrado')        
         } else{
          console.log("email n cadastrado step")
          this.alerta.showAlertSucess('Usuário cadastrado com sucesso!')        
        }
      })
    }
  }

}

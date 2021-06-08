import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Globals } from '../globals';
import { Cliente } from '../model/Cliente';
import { ClienteLogin } from '../model/ClienteLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {
  
  clienteLogin: ClienteLogin = new ClienteLogin()
  globals: Globals;
  
  constructor(
    private alerta : AlertasService,
    private authService: AuthService,
    private router: Router,
    globals: Globals
  ) {
    this.globals = globals;
  }

  ngOnInit(): void {
  }

  entrar() {
    
    this.authService.entrarCliente(this.clienteLogin).subscribe((resp: ClienteLogin ) => {
      this.clienteLogin = resp
      environment.tokenCliente = this.clienteLogin.tokenCliente
      environment.nomeCliente = this.clienteLogin.nomeCliente
      environment.emailCliente = this.clienteLogin.emailCliente
      environment.idCliente = this.clienteLogin.idCliente
      console.log(environment.tokenCliente)
      console.log(environment.emailCliente)    
      console.log(environment.nomeCliente)   
      console.log(environment.idCliente)

      this.findByIdCliente(resp.idCliente)

      this.router.navigate(['/home'])


    }, erro =>{
      if(erro.status == 500){
        this.alerta.showAlertDanger('Usuário ou senha incorretos!')
        
      }
    })
  }

  findByIdCliente(id: number) {
    this.authService.getByIdCliente(id).subscribe((resp: Cliente) => {
      this.globals.clienteLogado = resp
    })
  }

}

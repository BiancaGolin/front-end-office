import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Globals } from '../globals';
import { Cliente } from '../model/Cliente';
import { ClienteLogin } from '../model/ClienteLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cliente: Cliente = new Cliente()
  idCliente: number
  clienteLogin: ClienteLogin = new ClienteLogin()
  globals: Globals;


  constructor(
    private router: Router,
    public auth: AuthService,
    private alerta: AlertasService,
    globals: Globals
  ) {
    this.globals = globals;
  }

  ngOnInit(){
    window.scroll(0, 0)
    this.idCliente = environment.idCliente
    if(this.idCliente != 0){
      this.findByIdCliente(this.idCliente)
      console.log("id cliente = ", this.idCliente)
    }
  }

  findByIdCliente(id: number) {
    this.auth.getByIdCliente(id).subscribe((resp: Cliente) => {
      this.cliente = resp
    })
  }


  sair() {
    this.alerta.showAlertInfo('A sessão está sendo encerrada')
    this.router.navigate(['/home'])
    environment.tokenCliente = ''
    environment.emailCliente = ''
    environment.id = 0
  }


}

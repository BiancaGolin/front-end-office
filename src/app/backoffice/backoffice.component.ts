import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {

  usuarioLogado: boolean

  constructor(
    private router: Router,
    public auth: AuthService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.checaUsuarioLogado()
  }

  checaUsuarioLogado() {
    if(environment.nomeUsuario != ''){
      console.log("usuario ta logado")
      console.log(environment.nomeUsuario)
      return true;
    }
    console.log("usuario nao ta logado")
    return false;
  }

  sair() {
    this.alerta.showAlertInfo('A sessão está sendo encerrada')
    this.router.navigate(['/home'])
    environment.token = ''
    environment.email= ''
    environment.id = 0
  }

}

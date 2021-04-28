import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private alerta: AlertasService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  entrar() {
      this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
        this.usuarioLogin = resp

        if (this.usuarioLogin.statusUsuario == false) {
          this.alerta.showAlertDanger('Usuário desativado')
          this.router.navigate(['/home'])
        } else {
          environment.token = this.usuarioLogin.token
          environment.nomeUsuario = this.usuarioLogin.nomeUsuario
          environment.email = this.usuarioLogin.email
          environment.tipoUsuario = this.usuarioLogin.tipoUsuario
          environment.statusUsuario = this.usuarioLogin.statusUsuario
          console.log(environment.token)
          console.log(environment.email)
          this.router.navigate(['/backoffice'])
        }
      }, erro => {
        if (erro.status == 500) {
          this.alerta.showAlertDanger('Usuário ou senha incorretos!')
        }
      })
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  selectedStatus: number;
  status: any = [0, 1];

  usuario: Usuario = new Usuario()


  radioChangeHandler(event: any) {
    this.selectedStatus = event.target.value;
    if (this.selectedStatus == 1) {
      this.usuario.statusUsuario = true
    } else {
      this.usuario.statusUsuario = false
    }

    console.log("event target", event.target.value)
  }

  constructor(
    private router: Router,
    private alerta: AlertasService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  cadastrar() {
    console.log(JSON.stringify(this.usuario))

    this.authService.validaNome(this.usuario.nomeUsuario).subscribe((nomeComposto: Boolean) => {
      this.authService.validarCep(this.usuario.cep).subscribe((cepValido: Boolean) => {
        console.log("nome completo: " + nomeComposto)
        if (nomeComposto == false) {
          this.alerta.showAlertInfo("Por favor preencha o nome completo")
        } else if (cepValido == false) {
          this.alerta.showAlertInfo("Por favor preencha o cep valido")
        } else if (this.usuario.nomeUsuario.indexOf(' ') == -1) {
          this.alerta.showAlertInfo("Por favor preencha o nome completo")
        } else if (this.usuario.nomeUsuario == null || this.usuario.nomeUsuario.length < 5) {
          this.alerta.showAlertInfo('Preencha o campo de nome do usuário corretamente')
        }
        else if (this.usuario.email == null || this.usuario.email.indexOf('@' && '.') == -1) {
          this.alerta.showAlertInfo('Preencha o campo de email corretamente')
        }
        else if (this.usuario.senha == null || this.usuario.senha.length < 3) {
          this.alerta.showAlertInfo('Preencha o campo de senha corretamente')
        }
        else if (this.usuario.statusUsuario == null) {
          this.alerta.showAlertInfo('Preencha o campo de status')
        } else if (this.usuario.tipoUsuario == null) {
          console.log(this.usuario)
          this.alerta.showAlertInfo('Preencha o campo cargo')
        } else {
          this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
            this.usuario = resp
            this.router.navigate(['/listar-usuario'])
            if (this.usuario.email == 'email ja cadastrado') {
              console.log("email  ja cadastrado step")
              this.router.navigate(['/cadastrar-usuario'])
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





  }

}

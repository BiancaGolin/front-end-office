
import { ThrowStmt } from '@angular/compiler';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  selectedStatus: number;
  status: any = [0, 1];
  
  radioChangeHandler (event: any) {
    this.selectedStatus = event.target.value;
    if (this.selectedStatus == 1) {
      this.usuario.status = true
    } else {
      this.usuario.status = false
    }
    
    console.log("event target", event.target.value)
  }

  usuario: Usuario = new Usuario()
  imgPathInput = ""
  
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private alerta: AlertasService   
  ) { }

  ngOnInit() {
    
  }

  cadastrarUsuario() {
    if (this.usuario.nomeUsuario == null || this.usuario.nomeUsuario.length < 5){
      this.alerta.showAlertInfo('Campo nome deve ter mais de 5 caracteres')
    } else if(this.validateEmail(this.usuario)) {
      this.alerta.showAlertInfo('Campo email preenchido incorretamente')
    }
    else if(this.validaEmailExistente(this.usuario.emailUsuario)){
      this.alerta.showAlertInfo('O email preenchido já está cadastrado')
    }
    else if( this.usuario.senhaUsuario == null || this.usuario.senhaUsuario.length < 3){
      this.alerta.showAlertInfo('Senha inválida')

    }
    else if(this.usuario.tipoUsuario == null || this.usuario.status == null ){
      this.alerta.showAlertInfo('Preencha todos os campos do cadastro')

    }
     else {
      this.usuarioService.postUsuario(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
        console.log("usuariooooo",this.usuario.status)
        this.router.navigate(['/listar-usuario'])
        console.log("nome = ", this.usuario.nomeUsuario)
        this.alerta.showAlertSucess('Usuario cadastrado com sucesso!')
        
      })
    }
  }

  addToList(usuario: Usuario){
    this.usuarioService.postUsuario(usuario).subscribe((data)=>{
      
    })
  }

  validateEmail(usuario: Usuario) {
    console.log(usuario);
    if (this.usuario.emailUsuario == null || this.usuario.emailUsuario.indexOf('@' && '.') == -1) {
     return true;
    }
    else {
      return false;
    }
  }

  validaEmailExistente(usuario: String){
    console.log("vem p ca")
    const emailExiste = this.usuarioService.validaEmailExist(usuario);
    return emailExiste;
  }

  removeToList(index : number) {
  }

}






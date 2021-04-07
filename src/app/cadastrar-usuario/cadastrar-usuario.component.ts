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

  radioChangeHandler (event: any) {
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
    window.scroll(0,0)
  }

  cadastrar() {
    console.log(JSON.stringify(this.usuario))
    if (this.usuario.nomeUsuario == null || this.usuario.email == null || this.usuario.senha == null 
      || this.usuario.statusUsuario == null || this.usuario.tipoUsuario == null) {
      console.log(this.usuario)
      this.alerta.showAlertInfo('Preencha o campo de nome do usuário corretamente')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
        this.router.navigate(['/home'])
        if(this.usuario.email == 'email ja cadastrado'){
        console.log("email  ja cadastrado step")
        this.router.navigate(['/cadastrar-usuario'])
        this.alerta.showAlertSucess('Email já cadastrado')        
         } else{
          console.log("email n cadastrado step")
          this.alerta.showAlertSucess('Usuário cadastrado com sucesso!')        
        }
      })
    }
  }

}

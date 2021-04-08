import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario()
  listaUsuarios: Usuario[]
  idUsuario: number
  nomeUsuario: string
  usuarioLogadoAdmin: boolean


  constructor(
    private router:  Router,
    private authService: AuthService,
    private alerta: AlertasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.usuarioLogadoAdmin = this.checaUsuarioLogadoAdmin();
    this.findAllUsuarios()
  }

  findAllUsuarios() {
    this.authService.getAllUsuarios().subscribe((resp: Usuario[]) => {
      this.listaUsuarios = resp
    })

  }

  findByIdUsuario(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp : Usuario)=>{
      this.usuario = resp
    })
  }

  findByNomeUsuario(){
    this.authService.getByNomeUsuario(this.nomeUsuario).subscribe((resp : Usuario[])=>{
      this.listaUsuarios = resp
    })
  }

  checaUsuarioLogadoAdmin(){
    if(environment.tipoUsuario == 0){
      console.log("usuario é adm")
      return true;
    }
    console.log("usuario nao é adm")
    return false;
  }
}

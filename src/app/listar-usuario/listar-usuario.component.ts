import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  
  usuario: Usuario = new Usuario()
  listaUsuario: Usuario[]
  idUsuario: number
  nomeUsuario: string

  constructor(
    private router:  Router,
    private usuarioService: UsuarioService, 
    private alerta: AlertasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.findAllUsuario()
    
  }

  findAllUsuario() {
    this.usuarioService.getAllUsuario().subscribe((resp: Usuario[]) => {
      this.listaUsuario = resp
    })

  }

  findByIdProduto(){
    this.usuarioService.getByIdUsuario(this.idUsuario).subscribe((resp : Usuario)=>{
      this.usuario = resp
    })
  }

  findByNomeUsuario(){
    this.usuarioService.getByNomeUsuario(this.nomeUsuario).subscribe((resp : Usuario[])=>{
      this.listaUsuario = resp
    })
  }
}
 
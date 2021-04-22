import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ClienteLogin } from '../model/ClienteLogin';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuario/logar', usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/usuario/cadastrar', usuario)
  }

  getAllUsuarios() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:8080/usuario')
  }

  getByIdUsuario(id : number) : Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuario/id/${id}`)

  }

  getByNomeUsuario(nome: string) : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`http://localhost:8080/usuario/nomeUsuario/${nome}`)
  }

  putUsuario(usuario: Usuario) : Observable<Usuario> {
    return this.http.put<Usuario>('http://localhost:8080/usuario/alterar', usuario)
  }


  entrarCliente(clienteLogin: ClienteLogin): Observable<ClienteLogin> {
    return this.http.post<ClienteLogin>('http://localhost:8080/cliente/logar', clienteLogin)
  }

  bntSair(){
    let ok = false
    let token = environment.tokenCliente
    if(token != ''){
      ok = true
    }

    return ok
  }

  btnLogin(){
    let ok : boolean = false
    let token = environment.tokenCliente
    if(token == ''){
      ok = true
    }

    return ok
  }
}

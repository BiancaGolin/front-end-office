import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  validarCep(cep : string) : Observable<Boolean>{
    return this.http.get<Boolean>(`http://localhost:8080/usuario/consultacep/${cep}`)
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
}

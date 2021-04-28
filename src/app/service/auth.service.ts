import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Cliente } from '../model/Cliente';
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

  //----------FUNCIONÁRIO----------//

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

  //----------CLIENTE----------//

  entrarCliente(clienteLogin: ClienteLogin): Observable<ClienteLogin> {
    return this.http.post<ClienteLogin>('http://localhost:8080/cliente/logar', clienteLogin)
  }

  cadastrarCliente(cadastroCliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/cliente/cadastrar', cadastroCliente)
  }

  alterarCliente(alteraCliente: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>('http://localhost:8080/cliente/alterar', alteraCliente)
  }

  validarCep(cep: String): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/cliente/consultacep/${cep}`)
  }

  validaCpf(cpf: String): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/cliente/consultacpf/${cpf}`)
  }

  validaNome(nomeCliente: String): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/cliente/validanome/${nomeCliente}`)
  }

  getAllClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/cliente')
  }

  getByIdCliente(idCliente : number) : Observable<Cliente>{
    return this.http.get<Cliente>(`http://localhost:8080/cliente/id/${idCliente}`)
  }

  //----------VALIDACOES NAVBAR----------//

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

  btnFuncSair(){
    let ok = false
    let token = environment.token
    if(token != ''){
      ok = true
    }

    return ok
  }

  btnFuncLogin() {
    let ok : boolean = false
    let token = environment.token
    if(token == ''){
      ok = true
    }

    return ok
  }

  
}

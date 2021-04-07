import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  

  constructor(
    private http: HttpClient) { }

    
  validaEmailExist(email: String) : Observable<Boolean> {
    console.log("chamada api");
    return this.http.get<Boolean>(`http://localhost:8080/usuario/validemail/${email}`);
  }

  getAllUsuario() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:8080/usuario')
  }


  getByIdUsuario(id : number) : Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuario/id/${id}`)

  }

  getByNomeUsuario(nomeUsuario: string) : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`http://localhost:8080/usuario/nomeUsuario/${nomeUsuario}`)

  }

  postUsuario(usu: Usuario) : Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/produto', usu)
  }

  putUsuario(usuario: Usuario) : Observable<Usuario> {
    return this.http.put<Usuario>('http://localhost:8080/usuario', usuario)
  }
  
}


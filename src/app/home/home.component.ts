import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaProdutos: Produto[]
  usuarioLogado: boolean
  nomeClient = environment.nomeCliente
  nomeProduto: string
  public paginaAtual = 1;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    public auth: AuthService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.checaUsuarioLogado();
    this.findAllProdutos()
  }

  findAllProdutos() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })

  }

  findByNomeProduto(){
    this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp : Produto[])=>{
      this.listaProdutos = resp
    })
  }

  checaUsuarioLogado(){
    if(environment.nomeUsuario != ''){
      console.log("usuario ta logado")
      console.log(environment.nomeUsuario)
      return true;
    }
    console.log("usuario nao ta logado")
    return false;
  }

  sair() {
    this.alerta.showAlertInfo('A sessão está sendo encerrada')
    this.router.navigate(['/home'])
    environment.tokenCliente = ''
    environment.emailCliente = ''
    environment.id = 0
  }
}

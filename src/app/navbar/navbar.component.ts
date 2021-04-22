import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nomeClient = environment.nomeCliente

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    public auth: AuthService,
    private alerta: AlertasService
  ) { }

  ngOnInit(): void {
  }

  sair() {
    this.alerta.showAlertInfo('A sessão está sendo encerrada')
    this.router.navigate(['/home'])
    environment.tokenCliente = ''
    environment.emailCliente = ''
    environment.id = 0
  }
}

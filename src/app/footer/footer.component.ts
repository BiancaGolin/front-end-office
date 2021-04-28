import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    public auth: AuthService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
  }

}

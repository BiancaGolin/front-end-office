import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Compra } from '../model/Compra';
import { CompraService } from '../service/compra.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {

  listaPedidos: Compra[] = []
  listaPedidosUsuario: Compra[] = []

  constructor(
    private compraService: CompraService,
  ) { }

  ngOnInit(){
    this.getAllCompra()
  }

  getAllCompra() {
    this.compraService.getAllCompra().subscribe((resp: Compra[]) => {
      this.listaPedidos = resp
      console.log(resp)
      this.getPedidoUsuario()
    })
  }

  getPedidoUsuario() {
    for (let i = 0; i < this.listaPedidos.length; i++) {
      if (this.listaPedidos[i].idUsuario == environment.idCliente) {
        this.listaPedidosUsuario.push(this.listaPedidos[i])
      }
    }
  }

}

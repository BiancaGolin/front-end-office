import { Component, OnInit } from '@angular/core';
import { Compra } from '../model/Compra';
import { CompraService } from '../service/compra.service';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {
  public paginaAtual = 1;
  listaPedidos: Compra[] = []

  constructor(
    private compraService: CompraService
  ) { }
  

  ngOnInit() {
    this.getAllCompra()
  }


  getAllCompra() {
    this.compraService.getAllCompra().subscribe((resp: Compra[]) => {
      this.listaPedidos = resp
      console.log(resp)
    })
  }
}

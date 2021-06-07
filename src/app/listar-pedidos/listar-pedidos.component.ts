import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Compra } from '../model/Compra';
import { CompraService } from '../service/compra.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertasService } from '../service/alertas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {
  modalPedidoNum = "";
  changebleCompra: Compra;
  selectedStatus: String = ""
  public paginaAtual = 1;
  listaPedidos: Compra[] = []

  modalRef: BsModalRef;
    @ViewChild('template') templateRef: TemplateRef<any>;

  constructor(
    private compraService: CompraService,
    public modalService: BsModalService,
    private alert: AlertasService,
    private router: Router,
  ) { }
  

  ngOnInit() {
    this.modalService.onHide.subscribe((e) => {
      console.log('close',this.modalService.config.initialState);
    });
    this.getAllCompra()

    
  }


  getAllCompra() {
    this.compraService.getAllCompra().subscribe((resp: Compra[]) => {
      this.listaPedidos = resp
      this.listaPedidos.sort((x, y) => +new Date(y.dataCompra) - +new Date(x.dataCompra));
      console.log(resp)
    })
  }

  openModal(template: TemplateRef<any>, pedido: Compra) {
    this.modalRef = this.modalService.show(template, {
    });
    this.changebleCompra = pedido;
    this.modalPedidoNum = pedido.numeroPedido.toString();
  }

  changedStatus (event: any) {
    this.selectedStatus = event.target.value;
  }

  saveNewStatus(){

    if (this.selectedStatus != "Selecione" && this.selectedStatus != "" && this.selectedStatus != this.changebleCompra.statusPedido) {
      this.changebleCompra.statusPedido = this.selectedStatus;
      this.compraService.putCompra(this.changebleCompra).subscribe((resp: Compra) => {
        this.changebleCompra = resp
        this.alert.showAlertSucess('Status Alterado')
        // this.router.navigate(['/listar-pedidos'])
        // this.changebleCompra = new Compra();
      })
      this.modalRef.hide()
      // this.changebleCompra = new Compra();
    }else{
      console.log("valor selecionado invalido");
      // this.changebleCompra = new Compra();
    }

  }

}

import { ThrowStmt } from '@angular/compiler';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Imagem } from '../model/Imagem';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  selectedStatus: number;
  status: any = [0, 1];
  produto: Produto = new Produto()
  imgPathInput = ""

  selectedFile: File;

  prevImgListUrl: any[] = [];

  addImage(event: any){
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.prevImgListUrl.push(event.target.result)
        this.selectedFile = event.target.files[0]
      }
    }
  }
  
  radioChangeHandler (event: any) {
    this.selectedStatus = event.target.value;
    if (this.selectedStatus == 1) {
      this.produto.status = true
    } else {
      this.produto.status = false
    }
    
    console.log("event target", event.target.value)
  }

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private alerta: AlertasService   
  ) { }

  ngOnInit() {
    this.produto.imagem = []
  }

  cadastrar() {
    if (this.produto.nomeProduto == null || this.produto.nomeExtenso == null || this.produto.preco == null || this.produto.qtdEstoque == null || this.produto.qtdEstrelas == null || this.produto.status == null) {
      this.alerta.showAlertInfo('Preencha o campo de nome do produto corretamente')
    } else {
      this.produtoService.postProduto(this.produto).subscribe((resp: Produto) =>{
        this.produto = resp
        console.log("produtooooo",this.produto.status)
        this.router.navigate(['/listar-produto'])
        console.log("imagem = ", this.produto.imagem)
        this.alerta.showAlertSucess('Produto cadastrado com sucesso!')
        
      })
    }
  }

  addToList(){
    let newImage = new Imagem()
    newImage.path = this.imgPathInput
    this.produto.imagem.push(newImage);
  }

  removeToList(index : number) {
    this.produto.imagem.splice(index,1)
    this.prevImgListUrl.splice(index,1)
  }

}

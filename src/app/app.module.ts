import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutoComponent,
    ListarProdutoComponent,
    VisualizarProdutoComponent,
    AlertasComponent,
    EditarProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

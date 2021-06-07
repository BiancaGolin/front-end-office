import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { HomeComponent } from './home/home.component';
import { ComprarProdutoComponent } from './comprar-produto/comprar-produto.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { LoginClienteComponent } from './login-cliente/login-cliente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { AreaClienteComponent } from './area-cliente/area-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { Globals } from './globals';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { OrderReviewComponent } from './order-review/order-review.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutoComponent,
    ListarProdutoComponent,
    VisualizarProdutoComponent,
    AlertasComponent,
    EditarProdutoComponent,
    HomeComponent,
    ComprarProdutoComponent,
    CadastrarUsuarioComponent,
    ListarUsuarioComponent,
    EditarUsuarioComponent,
    LoginUsuarioComponent,
    BackofficeComponent,
    LoginClienteComponent,
    NavbarComponent,
    FooterComponent,
    CadastroClienteComponent,
    AreaClienteComponent,
    EditarClienteComponent,
    CarrinhoComponent,
    CheckoutComponent,
    PaymentComponent,
    MeusPedidosComponent,
    ListarPedidosComponent,
    OrderReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaClienteComponent } from './area-cliente/area-cliente.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ComprarProdutoComponent } from './comprar-produto/comprar-produto.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { HomeComponent } from './home/home.component';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { LoginClienteComponent } from './login-cliente/login-cliente.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home', component : HomeComponent },
  { path : 'cadastro-produto', component : CadastroProdutoComponent },
  { path: 'listar-produto', component: ListarProdutoComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'visualizar-produto', component: VisualizarProdutoComponent },
  { path: 'editar-produto', component: EditarProdutoComponent },
  { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent },
  { path: 'listar-usuario', component: ListarUsuarioComponent },
  { path: 'backoffice', component: BackofficeComponent },
  { path: 'area-cliente', component: AreaClienteComponent },
  { path: 'login-usuario', component: LoginUsuarioComponent },
  { path: 'login-cliente', component: LoginClienteComponent },
  { path: 'editar-produto/:id', component: EditarProdutoComponent},
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent},
  { path: 'editar-cliente', component: EditarClienteComponent},
  { path: 'visualizar-produto/:id', component: VisualizarProdutoComponent},
  { path: 'comprar-produto/:id', component: ComprarProdutoComponent },
  { path: 'carrinho', component: CarrinhoComponent }
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

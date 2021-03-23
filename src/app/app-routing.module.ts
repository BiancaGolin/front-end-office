import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ComprarProdutoComponent } from './comprar-produto/comprar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { HomeComponent } from './home/home.component';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home', component : HomeComponent },
  { path : 'cadastro-produto', component : CadastroProdutoComponent },
  { path: 'listar-produto', component: ListarProdutoComponent },
  { path: 'visualizar-produto', component: VisualizarProdutoComponent },
  { path: 'editar-produto', component: EditarProdutoComponent },
  { path: 'editar-produto/:id', component: EditarProdutoComponent},
  { path: 'visualizar-produto/:id', component: VisualizarProdutoComponent},
  { path: 'comprar-produto/:id', component: ComprarProdutoComponent}
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

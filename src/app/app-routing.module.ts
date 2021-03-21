import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro-produto', pathMatch: 'full' },
  { path : 'cadastro-produto', component : CadastroProdutoComponent },
  { path: 'listar-produto', component: ListarProdutoComponent },
  { path: 'visualizar-produto', component: VisualizarProdutoComponent },
  { path: 'editar-produto', component: EditarProdutoComponent },
  { path: 'editar-produto/:id', component: EditarProdutoComponent},
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

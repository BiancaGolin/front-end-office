import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeComponent } from './rodape/rodape.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CadastroProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

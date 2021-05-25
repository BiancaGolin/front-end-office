import { Injectable } from '@angular/core';
import { Produto } from './model/Produto';

@Injectable()
export class Globals {
  cesta: Produto[] = [];
  qnt: number[] = [];
  selFrete: number = 0;
  selCep: number = 0;
  payMeth: number = 0;
  qtdVezes: number = 0;
  selAddrName: String = "";
}

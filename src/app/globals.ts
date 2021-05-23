import { Injectable } from '@angular/core';
import { Produto } from './model/Produto';

@Injectable()
export class Globals {
  cesta: Produto[] = [];
  qnt: number[] = []; 
}

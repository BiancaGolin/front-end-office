import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarProdutoComponent } from './comprar-produto.component';

describe('ComprarProdutoComponent', () => {
  let component: ComprarProdutoComponent;
  let fixture: ComponentFixture<ComprarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprarProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

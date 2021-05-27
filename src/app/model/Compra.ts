import { Produto } from "./Produto"

export class Compra {
    public id: number
    public enderecoEntrega: String
    public statusPedido: String
    public formaPagamento: number
    public valorTotal: number
    public frete: number
    public numeroPedido: number
    public nParcelas: number
    public idUsuario: number
    public dataCompra: Date
    public produtosVinculados: Produto[]
    
}
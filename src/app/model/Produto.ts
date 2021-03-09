import { Imagem } from "./Imagem"

export class Produto {
    public id: number
    public nomeProduto: string
    public nomeExtenso: string
    public qtdEstrelas: number
    public status: boolean
    public qtdEstoque: number
    public preco: number
    public imagem: Imagem
}
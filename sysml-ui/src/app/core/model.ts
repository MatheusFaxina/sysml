export class Produto {
  codigo: number;
  nome: string;
  estoque: number;
  link: string;
  frete = new Frete();
  anuncio = new Anuncio();
  valorCustoSemFreteEAnuncio: number;
  valorVenda: number;
  valorCustoTotal: number;
  porcentagemLucro: number;
}

export class Anuncio {
  codigo: number;
  nome: string;
  porcentagem: number;
  parcelamento: boolean;
}

export class Frete {
  codigo: number;
  nome: string;
  valor: number;
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes = new Array<Permissao>();
}

export class Permissao {
  codigo: number;
  nome: string;
}

export class Venda {
  codigo: number;
  dataVenda: Date;
  produto = new Produto();
  valorTotal: number;
  lucro: number;
  numeroVenda: number;
  devolucao: boolean = false;
}

export class Configuracao {
  codigo: number;
  porcentagemLucroAceitavel: number;
}
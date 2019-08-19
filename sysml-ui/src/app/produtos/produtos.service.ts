import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Produto } from 'app/core/model';

export class ProdutoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ProdutosService {

  produtosUrl: string;

  constructor(private http: MoneyHttp) {
    this.produtosUrl = `${environment.apiUrl}/produtos/v1`;
  }

  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.produtosUrl}/filtrar`, { params })
      .toPromise()
      .then(response => {
        const produtos = response.content;

        const resultado = {
          produtos,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.produtosUrl}/todas`)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.produtosUrl}/remover/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post<Produto>(`${this.produtosUrl}/salvar`, produto)
      .toPromise();
  }

  atualizar(produto: Produto): Promise<Produto> {
    return this.http.put<Produto>(`${this.produtosUrl}/atualizar/${produto.codigo}`, produto)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Produto> {
    return this.http.get<Produto>(`${this.produtosUrl}/buscar-pelo-codigo/${codigo}`)
      .toPromise();
  }

}

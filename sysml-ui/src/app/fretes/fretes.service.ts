import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Frete } from 'app/core/model';
import { ProdutoFiltro } from 'app/produtos/produtos.service';

export class FreteFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class FretesService {

  fretesUrl: string;

  constructor(private http: MoneyHttp) {
    this.fretesUrl = `${environment.apiUrl}/fretes/v1`;
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

    return this.http.get<any>(`${this.fretesUrl}/filtrar`, { params })
      .toPromise()
      .then(response => {
        const fretes = response.content;

        const resultado = {
          fretes,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.fretesUrl}/todas`)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.fretesUrl}/remover/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(frete: Frete): Promise<Frete> {
    return this.http.post<Frete>(`${this.fretesUrl}/salvar`, frete)
      .toPromise();
  }

  atualizar(frete: Frete): Promise<Frete> {
    return this.http.put<Frete>(`${this.fretesUrl}/atualizar/${frete.codigo}`, frete)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Frete> {
    return this.http.get<Frete>(`${this.fretesUrl}/buscar-pelo-codigo/${codigo}`)
      .toPromise();
  }

}

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Venda } from 'app/core/model';

export class VendaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class VendasService {

  vendasUrl: string;

  constructor(private http: MoneyHttp) {
    this.vendasUrl = `${environment.apiUrl}/vendas/v1`;
  }

  pesquisar(filtro: VendaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.vendasUrl}/filtrar`, { params })
      .toPromise()
      .then(response => {
        const vendas = response.content;

        const resultado = {
          vendas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.vendasUrl}/todas`)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.vendasUrl}/remover/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(venda: Venda): Promise<Venda> {
    return this.http.post<Venda>(`${this.vendasUrl}/salvar`, venda)
      .toPromise();
  }

  devolver(venda: Venda): Promise<Venda> {
    return this.http.put<Venda>(`${this.vendasUrl}/devolver/${venda.codigo}`, venda)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Venda> {
    return this.http.get<Venda>(`${this.vendasUrl}/buscar-pelo-codigo/${codigo}`)
      .toPromise();
  }

}

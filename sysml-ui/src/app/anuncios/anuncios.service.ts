import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Anuncio } from 'app/core/model';

export class AnuncioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AnunciosService {

  anunciosUrl: string;

  constructor(private http: MoneyHttp) {
    this.anunciosUrl = `${environment.apiUrl}/anuncios/v1`;
  }

  pesquisar(filtro: AnuncioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.anunciosUrl}/filtrar`, { params })
      .toPromise()
      .then(response => {
        const anuncios = response.content;

        const resultado = {
          anuncios,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.anunciosUrl}/todas`)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.anunciosUrl}/remover/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(anuncio: Anuncio): Promise<Anuncio> {
    return this.http.post<Anuncio>(`${this.anunciosUrl}/salvar`, anuncio)
      .toPromise();
  }

  atualizar(anuncio: Anuncio): Promise<Anuncio> {
    return this.http.put<Anuncio>(`${this.anunciosUrl}/atualizar/${anuncio.codigo}`, anuncio)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Anuncio> {
    return this.http.get<Anuncio>(`${this.anunciosUrl}/buscar-pelo-codigo/${codigo}`)
      .toPromise();
  }

}

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';
import { Frete, Configuracao } from 'app/core/model';
import { ProdutoFiltro } from 'app/produtos/produtos.service';

@Injectable()
export class ConfiguracaoService {

  configuracaoUrl: string;

  constructor(private http: MoneyHttp) {
    this.configuracaoUrl = `${environment.apiUrl}/configuracao/v1`;
  }


  atualizar(configuracao: Configuracao): Promise<Configuracao> {
    return this.http.put<Configuracao>(`${this.configuracaoUrl}/atualizar/${configuracao.codigo}`, configuracao)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Configuracao> {
    return this.http.get<Configuracao>(`${this.configuracaoUrl}/buscar-pelo-codigo/${codigo}`)
      .toPromise();
  }

}

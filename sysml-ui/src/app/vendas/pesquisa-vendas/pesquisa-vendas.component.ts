import { Component, OnInit, ViewChild } from '@angular/core';
import { VendasService, VendaFiltro } from '../vendas.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfiguracaoService } from 'app/configuracao/configuracao.service';
import { Venda } from 'app/core/model';

@Component({
  selector: 'app-pesquisa-vendas',
  templateUrl: './pesquisa-vendas.component.html',
  styleUrls: ['./pesquisa-vendas.component.css']
})
export class PesquisaVendasComponent implements OnInit {

  totalRegistros = 0;
  filtro = new VendaFiltro();
  vendas = [];

  @ViewChild('tabela') grid;

  constructor(
    private vendaService: VendasService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private router: Router,
    private configuracaoService: ConfiguracaoService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Vendas');
  }

  devolver(venda: Venda) {
    if (venda.devolucao == false) {
      this.vendaService.devolver(venda)
        .then(venda => {
          this.messageService.add({ severity: 'success', detail: 'Venda devolvida com sucesso!' });
        })
        .catch((erro) => {
          this.messageService.add({ severity: 'error', detail: 'Houve um erro ao devolver a venda, tente novamente.' });
      });
    } else {
      this.messageService.add({ severity: 'error', detail: 'Essa venda já foi devolvida.' });
    }
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.vendaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.vendas = resultado.vendas;
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao pesquisar as vendas, tente novamente.' });
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}

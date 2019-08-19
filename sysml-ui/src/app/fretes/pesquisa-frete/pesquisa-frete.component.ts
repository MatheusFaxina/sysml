import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FreteFiltro, FretesService } from '../fretes.service';
import { Frete } from 'app/core/model';


@Component({
  selector: 'app-pesquisa-frete',
  templateUrl: './pesquisa-frete.component.html',
  styleUrls: ['./pesquisa-frete.component.css']
})
export class PesquisaFreteComponent implements OnInit {

  totalRegistros = 0;
  filtro = new FreteFiltro();
  fretes: Array<Frete>;
  @ViewChild('tabela') grid;

  constructor(
    private freteService: FretesService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de fretes');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.freteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.fretes = resultado.fretes;
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao pesquisar os fretes, tente novamente.' });
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(frete: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(frete);
      }
    });
  }

  excluir(frete: any) {
    this.freteService.excluir(frete.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Frete excluído com sucesso!' });
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao excluir o frete, tente novamente.' });
      });
  }

}

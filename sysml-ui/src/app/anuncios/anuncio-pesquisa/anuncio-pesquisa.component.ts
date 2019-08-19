import { AnuncioFiltro, AnunciosService } from './../anuncios.service';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-anuncio-pesquisa',
  templateUrl: './anuncio-pesquisa.component.html',
  styleUrls: ['./anuncio-pesquisa.component.css']
})
export class AnuncioPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AnuncioFiltro();
  anuncios = [];
  @ViewChild('tabela') grid;

  constructor(
    private anuncioService: AnunciosService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de anúncios');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.anuncioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.anuncios = resultado.anuncios;
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao pesquisar os anúncios, tente novamente.' });
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(anuncio: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(anuncio);
      }
    });
  }

  excluir(anuncio: any) {
    this.anuncioService.excluir(anuncio.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Anúncio excluído com sucesso!' });
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao excluir o anúncio, tente novamente.' });
      });
  }

}

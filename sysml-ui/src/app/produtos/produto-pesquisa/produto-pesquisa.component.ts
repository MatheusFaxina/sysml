import { ProdutoFiltro } from './../produtos.service';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Produto, Venda, Configuracao } from 'app/core/model';
import { VendasService } from 'app/vendas/vendas.service';
import { Router } from '@angular/router';
import { ConfiguracaoService } from 'app/configuracao/configuracao.service';

@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.component.html',
  styleUrls: ['./produto-pesquisa.component.css']
})
export class ProdutoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ProdutoFiltro();
  produtos = [];
  venda = new Venda();

  configuracao = new Configuracao();

  produtoTransferir = new Produto();

  numeroVenda: number;
  dialogVenda: boolean = false;

  @ViewChild('tabela') grid;

  constructor(
    private produtoService: ProdutosService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private vendaService: VendasService,
    private router: Router,
    private configuracaoService: ConfiguracaoService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de produtos');

    this.carregarConfiguracao(1);
  }

  carregarConfiguracao(codigo: number) {
    this.configuracaoService.buscarPorCodigo(codigo)
      .then(configuracao => {
        this.configuracao = configuracao;
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao carregar a configuração, tente novamente.' });
    });
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.produtoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.produtos = resultado.produtos;
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao pesquisar os produtos, tente novamente.' });
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(produto);
      }
    });
  }

  excluir(produto: any) {
    this.produtoService.excluir(produto.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Produto excluído com sucesso!' });
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao excluir o produto, tente novamente.' });
    });
  }

  vender(produto: Produto) {
    this.venda.produto = produto;
    if (produto.estoque >= 1) {
      if (produto.porcentagemLucro >= this.configuracao.porcentagemLucroAceitavel) {
        this.vendaService.adicionar(this.venda)
          .then(vendaAdicionada => {
            this.messageService.add({ severity: 'success', detail: 'Venda adicionada com sucesso!' });
            this.router.navigate(['/produtos']);
            this.dialogVenda = false;
        })
        .catch((erro) => {
          this.messageService.add({ severity: 'error', detail: 'Houve um erro ao vender o produto, tente novamente.' });
        });
      } else {
        this.messageService.add({ severity: 'error', detail: `A margem de lucro deve estar acima de ${this.configuracao.porcentagemLucroAceitavel}%.` });
      }
    } else {
      this.messageService.add({ severity: 'error', detail: 'Produto sem estoque.' });
    }
  }

  showDialogVenda(produto: Produto) {
    this.dialogVenda = true;
    this.produtoTransferir = produto;
  }

  salvarVenda(produto: Produto) {
    this.vender(this.produtoTransferir);
  }

}

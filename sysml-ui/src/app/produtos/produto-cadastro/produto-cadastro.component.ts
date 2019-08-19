import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/components/common/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Produto, Frete, Anuncio } from './../../core/model';
import { ProdutosService } from '../produtos.service';
import { AnunciosService } from 'app/anuncios/anuncios.service';
import { FretesService } from 'app/fretes/fretes.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto = new Produto();
  formulario: FormGroup;

  fretes: Array<Frete>;
  anuncios: Array<Anuncio>;

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private produtoService: ProdutosService,
    private anuncioService: AnunciosService,
    private freteService: FretesService,
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo produto');

    this.carregarAnuncios();
    this.carregarFretes();

    if (codigoLancamento) {
      this.carregarProduto(codigoLancamento);
    } else {}

  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.produto = new Produto();
    }.bind(this), 1);

    this.router.navigate(['/produtos/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de produto`);
  }

  carregarProduto(codigo: number) {
    this.produtoService.buscarPorCodigo(codigo)
      .then(produto => {
        this.produto = produto;
        //this.formulario.patchValue(pedido);
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao carregar o produto, tente novamente.' });
    });
  }

  get editando() {
    return Boolean(this.produto.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProduto(form);
    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .then(produtoAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Produto adicionado com sucesso!' });
        this.router.navigate(['/produtos', produtoAdicionada.codigo]);
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao salvar o produto, tente novamente.' });
    });
  }

  atualizarProduto(form: FormControl) {
    this.produtoService.atualizar(this.produto)
      .then(produto => {
        this.produto = produto;
        this.messageService.add({ severity: 'success', detail: 'Produto alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao atualizar o produto, tente novamente.' });
    });
  }

  carregarFretes() {
    return this.freteService.listarTodas()
      .then(fretes => {
        this.fretes = fretes;
      });
  }

  carregarAnuncios() {
    return this.anuncioService.listarTodas()
      .then(anuncios => this.anuncios = anuncios)
  }

}

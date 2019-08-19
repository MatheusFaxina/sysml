import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Anuncio } from 'app/core/model';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FretesService } from 'app/fretes/fretes.service';
import { Title } from '@angular/platform-browser';
import { AnunciosService } from '../anuncios.service';

@Component({
  selector: 'app-anuncio-cadastro',
  templateUrl: './anuncio-cadastro.component.html',
  styleUrls: ['./anuncio-cadastro.component.css']
})
export class AnuncioCadastroComponent implements OnInit {

  anuncio = new Anuncio();
  formulario: FormGroup;

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private anuncioService: AnunciosService,
  ) { }

  ngOnInit() {
    const codigoAnuncio = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo anúncio');

    if (codigoAnuncio) {
      this.carregarAnuncio(codigoAnuncio);
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
      this.anuncio = new Anuncio();
    }.bind(this), 1);

    this.router.navigate(['/anuncios/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de anúncio`);
  }

  carregarAnuncio(codigo: number) {
    this.anuncioService.buscarPorCodigo(codigo)
      .then(anuncio => {
        this.anuncio = anuncio;
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao carregar o anúncio, tente novamente.' });
      });
  }

  get editando() {
    return Boolean(this.anuncio.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAnuncio(form);
    } else {
      this.adicionarAnuncio(form);
    }
  }

  adicionarAnuncio(form: FormControl) {
    this.anuncioService.adicionar(this.anuncio)
      .then(produtoAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Anúncio adicionado com sucesso!' });
        this.router.navigate(['/anuncios', produtoAdicionada.codigo]);
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao salvar o anúncio, tente novamente.' });
      });
  }

  atualizarAnuncio(form: FormControl) {
    this.anuncioService.atualizar(this.anuncio)
      .then(anuncio => {
        this.anuncio = anuncio;
        this.messageService.add({ severity: 'success', detail: 'Anúncio alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao atualizar o anúncio, tente novamente.' });
      });
  }

}

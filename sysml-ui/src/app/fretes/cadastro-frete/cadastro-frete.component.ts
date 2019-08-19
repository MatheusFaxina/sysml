import { Component, OnInit } from '@angular/core';
import { Frete } from 'app/core/model';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FretesService } from '../fretes.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro-frete',
  templateUrl: './cadastro-frete.component.html',
  styleUrls: ['./cadastro-frete.component.css']
})
export class CadastroFreteComponent implements OnInit {

  frete = new Frete();
  formulario: FormGroup;

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private freteService: FretesService,
  ) { }

  ngOnInit() {
    const codigoFrete = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo frete');

    if (codigoFrete) {
      this.carregarProduto(codigoFrete);
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
      this.frete = new Frete();
    }.bind(this), 1);

    this.router.navigate(['/fretes/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de frete`);
  }

  carregarProduto(codigo: number) {
    this.freteService.buscarPorCodigo(codigo)
      .then(frete => {
        this.frete = frete;
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'O frete informado não foi encontrado.' });
        this.router.navigate(['/fretes']);
      });
  }

  get editando() {
    return Boolean(this.frete.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarFrete(form);
    } else {
      this.adicionarFrete(form);
    }
  }

  adicionarFrete(form: FormControl) {
    this.freteService.adicionar(this.frete)
      .then(produtoAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Frete adicionado com sucesso!' });
        this.router.navigate(['/fretes', produtoAdicionada.codigo]);
      })
      .catch((erro) => {
          this.messageService.add({ severity: 'error', detail: 'Houve um erro ao salvar o frete, tente novamente.' });
      });
  }

  atualizarFrete(form: FormControl) {
    this.freteService.atualizar(this.frete)
      .then(frete => {
        this.frete = frete;
        this.messageService.add({ severity: 'success', detail: 'Frete alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao atualizar o frete, tente novamente.' });
    });
  }

}

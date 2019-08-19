import { Component, OnInit } from '@angular/core';
import { Configuracao } from 'app/core/model';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfiguracaoService } from '../configuracao.service';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {

  configuracao = new Configuracao();
  formulario: FormGroup;

  constructor(
    private messageService: MessageService,
    private configuracaoService: ConfiguracaoService,
  ) { }

  ngOnInit() {
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


  configuracaoSalvar(form: FormControl) {
    this.configuracaoService.atualizar(this.configuracao)
      .then(configuracao => {
        this.configuracao = configuracao;
        this.messageService.add({ severity: 'success', detail: 'Configuração alterada com sucesso!' });
      })
      .catch((erro) => {
        this.messageService.add({ severity: 'error', detail: 'Houve um erro ao alterar a configuração, tente novamente.' });
    });
  }

}

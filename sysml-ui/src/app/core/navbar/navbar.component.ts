import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LogoutService } from './../../seguranca/logout.service';
import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  exibindoMenu = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-pw pi-home',
        routerLink: 'dashboard'
      },
      {
        label: 'Cadastros',
        icon: 'pi pi-pw pi-plus',
        items: [
          {
            label: 'Produtos',
            icon: 'pi pi-pw pi-plus',
            items: [
              { 
                label: 'Novo', icon: 'pi pi-pencil', routerLink: 'produtos/nova'
              },
              { 
                label: 'Pesquisa', icon: 'pi pi-search', routerLink: 'produtos'
              }
            ]
          },
          { 
            separator: true
          },
          {
            label: 'Anuncios',
            icon: 'pi pi-pw pi-plus',
            items: [
              { 
                label: 'Novo', icon: 'pi pi-pencil', routerLink: 'anuncios/nova'
              },
              { 
                label: 'Pesquisa', icon: 'pi pi-search', routerLink: 'anuncios'
              }
            ]
          },
          { 
            separator: true
          },
          {
            label: 'Fretes',
            icon: 'pi pi-pw pi-plus',
            items: [
              { 
                label: 'Novo', icon: 'pi pi-pencil', routerLink: 'fretes/nova'
              },
              { 
                label: 'Pesquisa', icon: 'pi pi-search', routerLink: 'fretes'
              }
            ]
          },
        ]
      },
      { 
        separator: true
      },
      {
        label: 'Vendas',
        icon: 'pi pi-pw pi-plus',
        items: [
          {
            label: 'Pesquisa', icon: 'pi pi-search', routerLink: 'vendas'
          },
          { 
            label: 'Estatísticas', icon: 'pi pi-pencil', routerLink: 'vendas/estatisticas'
          }
        ]
      },
      { 
        separator: true
      },
      {
        label: 'Configuração',
        icon: 'pi pi-pw pi-power-off',
        routerLink: 'configuracao'
      },
      {
        label: 'Sair',
        icon: 'pi pi-pw pi-power-off',
        routerLink: 'login'
      }
    ];
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProdutoPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: ProdutoCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: ProdutoCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }

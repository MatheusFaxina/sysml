
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './../seguranca/auth.guard';
import { AnuncioPesquisaComponent } from './anuncio-pesquisa/anuncio-pesquisa.component';

import { AnuncioCadastroComponent } from './anuncio-cadastro/anuncio-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: AnuncioPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: AnuncioCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: AnuncioCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AnunciosRoutingModule { }


import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './../seguranca/auth.guard';
import { CadastroFreteComponent } from './cadastro-frete/cadastro-frete.component';
import { PesquisaFreteComponent } from './pesquisa-frete/pesquisa-frete.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaFreteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: CadastroFreteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: CadastroFreteComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class FretesRoutingModule { }

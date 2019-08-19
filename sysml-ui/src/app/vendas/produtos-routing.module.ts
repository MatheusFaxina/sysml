import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { PesquisaVendasComponent } from './pesquisa-vendas/pesquisa-vendas.component';
import { EstatisticasVendasComponent } from './estatisticas-vendas/estatisticas-vendas.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaVendasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'estatisticas',
    component: EstatisticasVendasComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VendasRoutingModule { }

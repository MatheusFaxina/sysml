import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: 'produtos', loadChildren: 'app/produtos/produtos.module#ProdutosModule' },
  { path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule' },
  { path: 'anuncios', loadChildren: 'app/anuncios/anuncios.module#AnunciosModule' },
  { path: 'configuracao', loadChildren: 'app/configuracao/configuracao.module#ConfiguracaoModule' },
  { path: 'fretes', loadChildren: 'app/fretes/fretes.module#FretesModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'vendas', loadChildren: 'app/vendas/vendas.module#VendasModule'},

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

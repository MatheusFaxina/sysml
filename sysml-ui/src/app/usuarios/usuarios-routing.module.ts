import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: UsuariosCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: UsuariosCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }

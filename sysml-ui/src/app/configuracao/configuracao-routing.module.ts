import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { ConfigurarComponent } from './configurar/configurar.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurarComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ConfiguracaoRoutingModule { }

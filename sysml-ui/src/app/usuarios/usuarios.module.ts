import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,

    UsuariosRoutingModule
  ],
  declarations: [
    UsuariosCadastroComponent,
    UsuarioPesquisaComponent
  ]
})
export class UsuariosModule { }

import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from 'app/shared/shared.module';
import { ConfigurarComponent } from './configurar/configurar.component';
import { ConfiguracaoRoutingModule } from './configuracao-routing.module';

@NgModule({
  declarations: [ConfigurarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    DialogModule,
    TableModule,
    TooltipModule,
    PanelModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputSwitchModule,
    TabViewModule,

    SharedModule,

    ConfiguracaoRoutingModule
  ]
})
export class ConfiguracaoModule { }

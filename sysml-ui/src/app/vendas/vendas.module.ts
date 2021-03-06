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
import { PesquisaVendasComponent } from './pesquisa-vendas/pesquisa-vendas.component';
import { EstatisticasVendasComponent } from './estatisticas-vendas/estatisticas-vendas.component';
import { VendasRoutingModule } from './produtos-routing.module';

@NgModule({
  declarations: [PesquisaVendasComponent, EstatisticasVendasComponent],
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

    VendasRoutingModule
  ]
})
export class VendasModule { }

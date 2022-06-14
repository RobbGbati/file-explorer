import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng-lts/dialog';
import { InputTextModule } from 'primeng-lts/inputtext';
import { ButtonModule } from 'primeng-lts/button';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { MenuModule } from 'primeng-lts/menu';
import {DialogService, DynamicDialogModule} from 'primeng-lts/dynamicdialog';
import {ContextMenuModule} from 'primeng-lts/contextmenu';
import {ContextMenuService } from 'primeng-lts/api';
import {CardModule} from 'primeng-lts/card';

@NgModule({
  declarations: [],
  imports: [
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    ContextMenuModule,
    CardModule
  ],
  exports: [
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    ContextMenuModule,
    CardModule
  ],
  providers: [
    DialogService,
    ContextMenuService
  ]
})
export class PrimeNgModule { }

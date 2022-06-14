import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomFileExplorerComponent, } from './custom-file-explorer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [CustomFileExplorerComponent, LayoutComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    CustomFileExplorerComponent
  ]
})
export class CustomFileExplorerModule { }

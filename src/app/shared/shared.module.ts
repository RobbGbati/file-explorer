import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './modals/rename-dialog/rename-dialog.component';
import { PrimeNgModule } from './primeng.module';

@NgModule({
  declarations: [
    NewFolderDialogComponent,
    RenameDialogComponent
  ],
  imports: [
    PrimeNgModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NewFolderDialogComponent,
    RenameDialogComponent,
    PrimeNgModule
  ],
  entryComponents: [
    NewFolderDialogComponent,
    RenameDialogComponent,
  ]
})
export class SharedModule { }

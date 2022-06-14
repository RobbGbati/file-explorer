import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomFileExplorerModule } from './custom-file-explorer/custom-file-explorer.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomFileExplorerModule,
    SharedModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

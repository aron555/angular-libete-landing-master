import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import {AppModule, RootRouterComponent} from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [RootRouterComponent],
})
export class AppServerModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestTranslateModalComponent} from './test-translate-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MaterialFileInputModule} from 'ngx-material-file-input';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialFileInputModule,
      // ngx-translate and the loader module
      HttpClientModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
  ],
  declarations: [TestTranslateModalComponent],
  exports: [TestTranslateModalComponent],
})
export class TestTranslateModalModule {
}
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

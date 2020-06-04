import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestTranslateModalComponent} from './test-translate-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MaterialFileInputModule} from 'ngx-material-file-input';


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
  ],
  declarations: [TestTranslateModalComponent],
  exports: [TestTranslateModalComponent],
})
export class TestTranslateModalModule {
}

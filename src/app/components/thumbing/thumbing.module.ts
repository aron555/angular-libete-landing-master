import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThumbingComponent} from './thumbing.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ThumbingComponent],
  exports: [ThumbingComponent],
})
export class ThumbingModule { }

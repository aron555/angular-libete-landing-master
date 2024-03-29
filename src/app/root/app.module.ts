import {BrowserModule} from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ThumbingModule} from '../components/thumbing/thumbing.module';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {HttpClientModule} from '@angular/common/http';
import {TestTranslateModalModule} from '../modals/test-translate-modal/test-translate-modal.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ClickOutsideModule} from 'ng-click-outside';


@Component({
  selector: 'app-root-router',
  template: '<router-outlet></router-outlet>',
})
export class RootRouterComponent {
}

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: ':lang', component: AppComponent},
  {path: '**', redirectTo: '/en'},
];

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ThumbingModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    ScrollToModule.forRoot(),
    HttpClientModule,
    TestTranslateModalModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    ClickOutsideModule,
  ],
  declarations: [
    RootRouterComponent,
    AppComponent,
  ],
  providers: [],
  bootstrap: [RootRouterComponent]
})
export class AppModule {
}

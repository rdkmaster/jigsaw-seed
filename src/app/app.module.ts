import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {
  PopupService, RdkJigsawModule
} from '@rdkmaster/jigsaw';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule, Http} from '@angular/http';
import {RouterModule} from '@angular/router';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot([{
      path: '**',
      component: AppComponent
    }]),
    RdkJigsawModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [Http]
        },
        isolate: true
      }
    ),
  ],
  providers: [PopupService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}

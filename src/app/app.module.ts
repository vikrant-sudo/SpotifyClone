import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TranslatorAppComponent } from './translator-app/translator-app.component';
import { InvalidJsonComponent } from './translator-app/invalid-json/invalid-json.component';
import { ValidJsonComponent } from './valid-json/valid-json.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TranslationSuccessfullComponent } from './translation-successfull/translation-successfull.component';
import { MusicAppComponent } from './music-app/music-app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './music-app/search/search.component';
import { GenreComponent } from './music-app/genre/genre.component';
import { PlaylistComponent } from './music-app/playlist/playlist.component';
import { EllipsisPipe } from './shared/pipes/ellipsis.pipe';
import { TrimPipe } from './shared/pipes/trim.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    TranslatorAppComponent,
    InvalidJsonComponent,
    ValidJsonComponent,
    ProgressBarComponent,
    TranslationSuccessfullComponent,
    MusicAppComponent,
    HomeComponent,
    SearchComponent,
    GenreComponent,
    PlaylistComponent,
    EllipsisPipe,
    TrimPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

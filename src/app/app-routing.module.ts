import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TranslatorAppComponent } from './translator-app/translator-app.component';
import { InvalidJsonComponent } from './translator-app/invalid-json/invalid-json.component';
import { ValidJsonComponent } from './valid-json/valid-json.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TranslationSuccessfullComponent } from './translation-successfull/translation-successfull.component';
import { MusicAppComponent } from './music-app/music-app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './music-app/search/search.component';
import { GenreComponent } from './music-app/genre/genre.component';
import { PlaylistComponent } from './music-app/playlist/playlist.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'search-bar', component: SearchBarComponent
  },
  {
    path: 'translator-app', component: TranslatorAppComponent
  },
  {
    path: "invalid-json", component: InvalidJsonComponent
  },
  {
    path: "valid-json", component: ValidJsonComponent
  },
  {
    path: "progress-bar", component: ProgressBarComponent
  },
  {
    path: "translation-successfull", component: TranslationSuccessfullComponent
  },
  {
    path: "music-app", component: MusicAppComponent,
    children:[
      {
        path: "search", component: SearchComponent
      },
      {
        path:'gener/:categoryId', component: GenreComponent
      },
      {
        path:'playlist/:playlistId', component: PlaylistComponent
      }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

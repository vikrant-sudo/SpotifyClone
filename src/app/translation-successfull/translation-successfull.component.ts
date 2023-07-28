import { Component } from '@angular/core';
import { LanguageNameService } from '../language-name.service';

@Component({
  selector: 'app-translation-successfull',
  templateUrl: './translation-successfull.component.html',
  styleUrls: ['./translation-successfull.component.css']
})
export class TranslationSuccessfullComponent {
  destLanguage: string = '';
  constructor(private languageService: LanguageNameService){
    this.destLanguage=this.languageService.destinationLnaguage;
  }

}

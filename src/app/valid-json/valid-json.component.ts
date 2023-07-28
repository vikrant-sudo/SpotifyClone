import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LanguageNameService } from '../language-name.service';

@Component({
  selector: 'app-valid-json',
  templateUrl: './valid-json.component.html',
  styleUrls: ['./valid-json.component.css']
})
export class ValidJsonComponent {
  close:any
  open:any
  dropdownMenu:any;
  inputValue:any
  constructor(private router: Router, private renderer: Renderer2, private langName: LanguageNameService){}
  ngOnInit(){
    this.getAndSetHTMLElementStyle();
  }
  translateInto(){
    this.router.navigate(['progress-bar']);
  }
  getAndSetHTMLElementStyle(){
    // getting element reference
    this.close=document.getElementById('close');
    this.open=document.getElementById('open');
    this.dropdownMenu=document.getElementById('dropdown-menu');
    this.inputValue=document.getElementById('button-input')

    // setting style to element
    this.close.style.display="none";
  }
  toggleArrow(){
    if(this.close.style.display==="none"){
      this.open.style.display="none";
      this.close.style.display="block";
      this.dropdownMenu.style.display="block";
    }else{
      this.open.style.display="block";
      this.close.style.display="none";
      this.dropdownMenu.style.display="none";
    }
  }
  languageSelected(value: string){
    // console.log(value)
    this.open.style.display="block";
    this.close.style.display="none";
    this.dropdownMenu.style.display="none";
    this.inputValue.value=value;
    this.langName.destinationLnaguage=value;
  }
}

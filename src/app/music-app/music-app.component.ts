import { Component, ElementRef, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observer } from 'rxjs';
import {environment} from '../../environments/environment'
import { AuthService } from '../auth.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ColorService } from '../shared/services/color.service';


@Component({
  selector: 'app-music-app',
  templateUrl: './music-app.component.html',
  styleUrls: ['./music-app.component.css']
})
export class MusicAppComponent {
  access_token: string = '';
  expires_in: number = 0;
  dropdown_button_down: any;
  dropdown_button_up: any;
  select_option: any
  xCoordinate: number = 0;
  top: number = 0;
  selectedSortOption: string = 'Recently Added';
  allSortOption: Array<string> = ["Recently Added", "Alphabetical", "Creater"];
  checkMark: any;
  search_button_input: any;
  xCordinate_search_button_image: number = 0;
  top_search_button_image: number = 0;
  xCordinate_search_button_image_clone: number = 0;
  top_search_button_image_clone:number = 0;
  search_button_image_clone: any;
  expended_search: any;
  header_center: any
  currentPath: string = '';
  detectedColor: any;

  constructor(private http: HttpClient,private elementRef: ElementRef, private authService: AuthService, private router: Router, private route: ActivatedRoute, private location: Location, private colorService: ColorService){
    this.makeAuthorizationRequest();
    this.colorService.getColor().subscribe((color)=>{
      // console.log(color)
      this.detectedColor=color;
    })
  }
  ngOnInit(){
    this.dropdown_button_down=document.getElementById("dropdown-button-down");
    this.dropdown_button_up=document.getElementById("dropdown-button-up");
    this.select_option=document.getElementById('select-option');
    this.search_button_input=document.getElementById("search-button-input")
    this.search_button_image_clone=document.getElementById("search-button-image-clone");
    this.expended_search=document.getElementById("expended-search")
    this.header_center=document.getElementById("header-center");
    this.getCurrentPath();
  }
  // @HostListener('click')
  // onClick(){
  //   console.log('clicked from hostlistener')
    // this.select_option.style.display='none'
  // }
  getCurrentPath(){
    // console.log(window.location.pathname)
    this.currentPath=window.location.pathname;
    this.showHideHeaderSearch();
  }
  showHideHeaderSearch(){
    if(this.currentPath=='/music-app'){
      this.header_center.style.display='none';
    }else if(this.currentPath=='/music-app/search'){
      this.header_center.style.display='block';
      this.header_center.style.marginLeft=-285+"px";
    }
  }
  
  // getSearchPath(path: string){
  //   console.log(path);
  //   if((this.homePathUrl+"/"+path)=="music-app/search"){
  //     this.header_center.style.display='block';
  //   }
  // }
  getTopLeftPosition(){
    const element: HTMLElement = this.elementRef.nativeElement.querySelector('#dropdown-option');
    this.xCoordinate = element.getBoundingClientRect().left;
    this.top = element.getBoundingClientRect().top;
  }
  getTopLeftPositionSearchInput(){
    const element: HTMLElement = this.elementRef.nativeElement.querySelector('#header-center-input')
    return element;
  }
  applyCheck(){
    this.checkMark = document.getElementById(this.selectedSortOption)
    this.allSortOption.forEach(option =>{
      if(option==this.selectedSortOption){
        this.checkMark.style.display="block";
      }else{
        const element = document.getElementById(option);
        if(element){
          element.style.display="none"
        }
      }
    })

  }
  dropdownOptionShow(event: Event){
    event.stopPropagation();
      this.getTopLeftPosition();
      this.applyCheck()
      this.dropdown_button_down.style.display='none';
      this.dropdown_button_up.style.display='block';
      this.select_option.style.top=(this.top+25)+"px";
      this.select_option.style.left=(this.xCoordinate-10)+"px";
      this.select_option.style.display='block'
  }
  dropdownOptionHide(){
    this.dropdown_button_down.style.display='block';
    this.dropdown_button_up.style.display='none';
    this.select_option.style.display='none'
  }
  hideExpendedSearch(){
    this.expended_search.style.display='none';
  }
  showInputField(event: Event){
    event.stopPropagation();
    this.expended_search.style.display='block';
    const search_button_image: HTMLElement = this.elementRef.nativeElement.querySelector('#search-button-image');
    const search_button_image_clone:HTMLElement = this.elementRef.nativeElement.querySelector('#search-button-image-clone');
    this.xCordinate_search_button_image = search_button_image.getBoundingClientRect().left;
    this.top_search_button_image = search_button_image.getBoundingClientRect().top;
    this.xCordinate_search_button_image_clone = search_button_image_clone.getBoundingClientRect().left;
    this.top_search_button_image_clone = search_button_image_clone.getBoundingClientRect().top;
    this.search_button_input.style.top=(this.top_search_button_image-6)+'px';
    this.search_button_input.style.left=(this.xCordinate_search_button_image-5)+'px';
    this.search_button_input.style.position='absolute';
    this.search_button_input.style.display='flex';
    this.search_button_image_clone.style.top=(this.top_search_button_image)+'px';
    this.search_button_image_clone.style.left=(this.xCordinate_search_button_image-5)+'px';
    this.search_button_image_clone.style.position='absolute';
    this.search_button_image_clone.style.display='flex'
  }
  closeSearchAnddropdownButton(){
    this.dropdownOptionHide();
    this.hideExpendedSearch();
  }
  changeSortOption(selectedSortOption: string){
    this.selectedSortOption=selectedSortOption;
    this.dropdownOptionHide();
  }

  navigateToHome(){
    this.router.navigate(['music-app'])
  }
  navigateToSearch(){
    this.router.navigate(["search"], { relativeTo: this.route })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getCurrentPath();
        const element : HTMLElement = this.getTopLeftPositionSearchInput()
        const xCordinate = element.getBoundingClientRect().left;
        const top = element.getBoundingClientRect().top;
        // console.log(xCordinate, top)
        let header_center_input_search_button = document.getElementById('header-center-input-search-button')
        if(header_center_input_search_button){
          header_center_input_search_button.style.top=(top+3)+"px"
          // header_center_input_search_button.style.left=xCordinate+"px"
        }
      }
    })
  }
  
  makeAuthorizationRequest() {
    const clientId = environment.clientId;
    const clientSecret = environment.secretId;
    
    // Encode the client ID and client secret in base64
    const base64AuthString = btoa(`${clientId}:${clientSecret}`);
    
    // Set the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64AuthString}`
    });
    
    // Set the request body
    const body = 'grant_type=client_credentials';

    // Create the observer
  const observer: Observer<any> = {
    next: (response) => {
      // Handle the response from the API
      // console.log(response);
      this.authService.setAccessToken(response.access_token);
    },
    error: (error) => {
      // Handle any errors that occurred during the API call
      console.error(error);
    },
    complete: () => {
      // Handle any cleanup or completion tasks
      // console.log('API call completed');
    }
  };
    
    // Make the POST request
    this.http.post('https://accounts.spotify.com/api/token', body, { headers })
      .subscribe(observer);
  }
}

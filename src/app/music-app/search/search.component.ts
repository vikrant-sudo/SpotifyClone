import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchPathUrl: string = '';
  categoryItems: any = [];
  categoryNames: {name:string, icon: string, categoryId:string}[] = [];
  categoriesItemBackgroundColor: string[] = ['#E13300', '#7358FF','#1E3264','#E8115B','#E91429','#B02897','#A56752','#D84000','#8D67AB','#148A08','#E91429','#B02897','#E61E32','#8D67AB','#E1118C','#537AA1','#C39687','#BA5D07','#BC5900','#D84000','#BA5D07','#D84000','#E8115B','#148A08','#777777','#777777','#056952', '#ff0090','#e91429','#1e3264','#7d4b32','#537aa1','#777777','#5179a1','#d84000','#dc148c','#e91429','#777777','#7d4b32','#bc5900','#503750','#0d72ea','#dc148c','#8d67ab','#e41d63','#af2896','#1e3264','#477d95','#b06239','#ba5d07','#e91429','#a56752','#0d72ed','#0d73ec','#d84000','#8c1932','#477d95','#e61e32','#148a08','#27856a','#eb1e32','#f59b23','#0d73ec','#ff4632','#e1118c','#e8115b'];
  constructor(private route: ActivatedRoute, private spotify: SpotifyService, private router: Router){}
  ngOnInit(){
    this.spotify.getCategories().subscribe((response: any)=>{
      this.categoryItems=response['categories']['items'];
      this.categoryItems.map((value: any,index: number)=>{
        this.categoryNames.push({'name':value['name'], icon: value['icons'][0].url, categoryId: value['id']});
      })
    })
  }
  ngAfterViewChecked() {
    const elements = document.querySelectorAll('.category-name');
    // console.log(elements);
    elements.forEach((element: any,key: number) => {
      if(element){
        element.style.backgroundColor=this.categoriesItemBackgroundColor[key];
      }
    });
  }
  navigateToGenerById(categoryId: string){
    this.router.navigate(['../gener',categoryId],{relativeTo:this.route});
  }

}

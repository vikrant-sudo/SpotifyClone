import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SpotifyService } from 'src/app/spotify.service';
import {PlaylistResponse} from '../../shared/interfaces/category-playlist-response.interface';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {
  playListItemsDetails : {name:any, description: any, imageUrl: any, playlistId: any}[] = []
  constructor(private spotifyService: SpotifyService, private activatedRoute: ActivatedRoute, private router: Router, private imageService: ImageService){}
  ngOnInit(){
    this.activatedRoute.params.subscribe(param=>{
      this.spotifyService.getCategoryPlaylist(param['categoryId']).subscribe((response: any)=>{
        response['playlists']['items'].map((value: any)=>{
          let categoryTrimed = value.description.length < 50 ? value.description : (value.description.slice(0,49))+'...'
          this.playListItemsDetails.push({name: value.name, description: categoryTrimed, imageUrl: value.images[0].url, playlistId: value.id})
        })
      })
    })
  }

  getPlaylistDetailsById(playlistId: string, playlistImageUrl: string){
    this.imageService.setImageUrl(playlistImageUrl);
    this.router.navigate(['../../playlist',playlistId], {relativeTo: this.activatedRoute});
  }
}

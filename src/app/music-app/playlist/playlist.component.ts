import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/image.service';
import { SpotifyService } from 'src/app/spotify.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { ColorService } from 'src/app/shared/services/color.service';
import { EllipsisPipe } from '../../shared/pipes/ellipsis.pipe'
import { PlaybackService } from 'src/app/shared/services/playback.service';

declare const ColorFinder: any;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  name: string = '';
  description: string = '';
  totalLikes: number = 0
  totalSong: number = 0;
  type: string = ''
  playlistSongDetails: {dateAdded:string, trackName: string,artistNames: {name: string}[], albumName: string, duration: string, trackId: string, albumImage: string}[]= [];
  playlistImageUrl: string = ''
  headerStyles = {};
  detectedColor: any; // Variable to store the detected color
  pngImage: any;
  proxyEndpoint: any;
  imageData: any;
  descriptionColor: any;
  totalDuration: number = 0;
  totalDurationInHour: number[]=[];
  player: any;
  constructor(private spotifyService: SpotifyService, private activatedRoute: ActivatedRoute, private imageService: ImageService, private http: HttpClient, private colorService: ColorService, private playbackService: PlaybackService){}
  ngOnInit(){
    this.playlistImageUrl =  this.imageService.getImageUrl();
    this.getImageData()
    let artistNames: {name: string}[] = [];
    this.activatedRoute.params.subscribe((param: any)=>{
      this.spotifyService.getPlaylistDetailsById(param['playlistId']).pipe(tap((response:any)=>{
        this.description=response['description'];
        this.name=response['name'];
        this.totalLikes=response['followers']['total'];
        this.totalSong=response['tracks']['total'];
        this.type=response['type'];
        response['tracks']['items'].map((value:any)=>{
          artistNames=[];
          value['track']['artists'].map((artist:any)=>{
            artistNames.push({name: artist.name})
          })
          let daysDifference: string = this.calculateTimeDifferenceInDays(value['added_at']);
          let durationIntoSecond = this.calculateMilisecondIntoSecond(value['track']['duration_ms']);
          let trackName = value['track']['name'].length < 40 ? value['track']['name'] : value['track']['name'].slice(0, 39)+'...';
          let albumName = value['track']['album']['name'].length < 40 ? value['track']['album']['name'] : value['track']['album']['name'].slice(0, 39)+'...';
          // let trackName = value['track']['name'];
          // let albumName = value['track']['album']['name'];
          this.totalDuration=this.totalDuration+value['track']['duration_ms']
          this.playlistSongDetails.push({dateAdded: daysDifference,trackName: trackName,artistNames: artistNames, albumName: albumName, duration: durationIntoSecond, trackId: value['track']['id'], albumImage: value['track']['album']['images'][0].url})
        })
      })
      ).subscribe(()=>{
        this.totalDurationInHour.push(Math.floor(this.totalDuration / (1000 * 60 * 60)));
        this.totalDurationInHour.push(Math.floor((this.totalDuration % (1000 * 60 * 60)) / (1000 * 60)));
      })
    })
  }
  connectToSpotifyPlayer(){
    this.playbackService.addPlayerListeners().then((success: {player: any, message: string})=>{
      this.player = success.player;
      this.player.connect().then((success: any) => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
      
          // Step 2: Start playing a song (you can provide the Spotify URI or URL of the track).
          const spotifyTrackUri = 'spotify:track:741UUVE2kuITl0c6zuqqbO';
          this.player.resume(spotifyTrackUri).then(() => {
            console.log('Started playing the track!');
          }).catch((error: any) => {
            console.error('Failed to play the track:', error);
          });
      
          // Step 3: Add event listeners to handle player events.
          this.player.addListener('player_state_changed', (state: any) => {
            console.log('Player state changed:', state);
            // Handle the player state change here.
          });
      
          // Step 4: Control the playback (optional).
          // For example, you can pause, resume, seek, etc.
          // player.pause();
          // player.seek(30); // Seek to 30 seconds in the track.
      
          // You can perform more actions with the player as needed based on your application's requirements.
      
        } else {
          console.error('Failed to connect to the Web Playback SDK.');
        }
      }).catch((error: any) => {
        console.error('Failed to initialize the Web Playback SDK:', error);
      });
    })

// Step 1: Connect to the player.


}
  calculateTimeDifferenceInDays(pastDate: any){
    let apiDate: any = new Date(pastDate);
    let currentDate: any = new Date();
    // Convert both dates to UTC to ensure accurate calculation
    apiDate.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0, 0, 0, 0);
    // Calculate the difference in milliseconds
    let timeDifference: any = currentDate - apiDate;
    // Convert milliseconds to days
    let daysDifference: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference + " days";
  }
  calculateMilisecondIntoSecond(milisecond: string){
    return (Number(milisecond)/(1000*60)).toFixed(2);
  }
  getImageData(){
    this.proxyEndpoint = 'http://localhost:3000/getImageData';
    const params = { playlistImageUrl: this.playlistImageUrl };
    this. http.get(this.proxyEndpoint, {params}).subscribe((response: any)=>{
      this.imageData=response.data;
      const imgData = new Uint8Array(this.imageData);
      const imgData1 = new Uint8Array(this.imageData.slice(0, 120000));
      this.getProminentColorFromImage(imgData);
    })
  }

  getProminentColorFromImage(imageData: any){
    const chunkSize = 120000; // Adjust the chunk size as needed
    const numChunks = Math.ceil(this.imageData.length / chunkSize);
    let base64Image = '';
    for (let i = 0; i < numChunks; i++) {
      const chunk = this.imageData.slice(i * chunkSize, (i + 1) * chunkSize);
      const base64Chunk = btoa(String.fromCharCode.apply(null, chunk));
      base64Image += base64Chunk;
    }
    
    const script = document.createElement('script');
    script.src = './assets/color.js';
    // const base64Image1 = btoa(String.fromCharCode.apply(null, imageData));
    const image = new Image();
    image.src = `data:image/jpeg;base64,${base64Image}`;
    script.onload = () => {
      this.onImageLoad(image);
    };
    document.body.appendChild(script);
  }

  favorBright(r: any,g: any,b: any) {
    return r+g+b+1;
  }

  onImageLoad(image: any) {
    let rgb: any = new ColorFinder(this.favorBright).getMostProminentColor(image);
    this.detectedColor=`rgb(${rgb.r-50}, ${rgb.g-50}, ${rgb.b-50})`;
    this.descriptionColor=`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    this.colorService.setColor(this.detectedColor);
  }
  getBackground(){
    return "linear-gradient(to bottom, rgba(198, 198, 198, 0.7), transparent);"
  }
  showHiddenElement(trackId: any){
    let songItem: any = document.getElementById(`song-item-${trackId}`);
    let playSongImage: any = document.getElementById(`play-song-image-${trackId}`)
    let heartSmallImage:any = document.getElementById(`heart-small-image-${trackId}`)
    let moreHorizontalSmallImage:any = document.getElementById(`more-horizontal-small-image-${trackId}`)
    playSongImage.style.display = 'block';
    heartSmallImage.style.display = 'block';
    moreHorizontalSmallImage.style.display = 'block';
    songItem.style.backgroundColor = '#2a2a2a'
  }
  hideHiddenElement(trackId: any){
    let songItem: any = document.getElementById(`song-item-${trackId}`);
    let playSongImage: any = document.getElementById(`play-song-image-${trackId}`)
    let heartSmallImage:any = document.getElementById(`heart-small-image-${trackId}`)
    let moreHorizontalSmallImage:any = document.getElementById(`more-horizontal-small-image-${trackId}`)
    playSongImage.style.display = 'none';
    heartSmallImage.style.display = 'none';
    moreHorizontalSmallImage.style.display = 'none';
    songItem.style.backgroundColor = '#121212'
  }
}

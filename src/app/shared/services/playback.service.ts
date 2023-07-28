import { Injectable, resolveForwardRef } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
// import * as Spotify from 'spotify-web-playback-sdk';

declare global {
  interface Spotify {
    Player: any;
  }
}
namespace SpotifyTypes {
  export type Player = any; // Replace 'any' with the actual type of Spotify.Player
}

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {
  private player: SpotifyTypes.Player | null = null;

  // private player: any;

  constructor(private authService: AuthService) {}
   private loadSpotifyWebPlaybackSDK(): Promise<void> {
    return new Promise((resolve, reject)=>{
      console.log('loadSpotifyWebPlaybackSDK start');
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
        scriptTag.onload = async () => {
          console.log('document loaded');
          await this.onSpotifyWebPlaybackSDKReady();
          resolve()
        };
        scriptTag.onerror = () => {
          console.log('document loading failed');
          reject('Issue while loading script file')
        };
      document.head.appendChild(scriptTag);
      console.log('loadSpotifyWebPlaybackSDK end');
    })
  }
  
  private onSpotifyWebPlaybackSDKReady(): Promise<void>{
    return new Promise((resolve, reject)=>{
      console.log('onSpotifyWebPlaybackSDKReady start');
      const token = this.authService.getAccessToken(); // Replace this with your actual access token
      this.player = new (window as any).Spotify.Player({ // Cast 'window' to 'any' to access the 'Spotify' property
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5
      });
      resolve()
      console.log('onSpotifyWebPlaybackSDKReady end');
      console.log(this.player);
    })
  }
  
  public async addPlayerListeners(): Promise<any> {
    await this.loadSpotifyWebPlaybackSDK();
    console.log('addPlayerListeners start');
    console.log(this.player);
    // Check if the player is available
    return new Promise((resolve, reject)=>{
      if (!this.player) {
        reject('Colud not instanciate player')
      }else{
        resolve({player: this.player, message: 'Player instanciateed successfully'});
      }
    })
    // Ready event
    // this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
    //   console.log('Ready with Device ID', device_id);
    // });
    // // Not Ready event
    // this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
    //   console.log('Device ID has gone offline', device_id);
    // });
    // this.player.addListener('initialization_error', ({ message }: { message: string }) => {
    //   console.error(message);
    // });
    // this.player.addListener('authentication_error', ({ message }: { message: string }) => {
    //     console.error(message);
    // });
    // this.player.addListener('account_error', ({ message }: { message: string }) => {
    //     console.error(message);
    // });
    // this.player.connect().then((success: any) => {
    //   if (success) {
    //     console.log('The Web Playback SDK successfully connected to Spotify!');
    //   }
    // },
    // (error: any)=>{
    //   console.log('The Web Playback SDK could not connected to Spotify!');
    // })
    console.log('addPlayerListeners end');
    
  }

  
}
